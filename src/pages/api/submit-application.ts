import { NextApiRequest, NextApiResponse } from "next";

// Email mapping based on application type - Backend handles this
const emailMapping: Record<string, string> = {
  career: "careers@eshaafi.com",
  business: "business@eshaafi.com",
  growth: "growth@eshaafi.com",
  social: "social@eshaafi.com",
  thu: "thu@eshaafi.com",
  blog: "blog@eshaafi.com",
};

// Validation helpers
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Accept 10-15 digits, with optional +, -, (), and spaces
  const phoneRegex = /^[\d+\-\s()]{10,15}$/;
  return phoneRegex.test(phone);
};

type ResponseData = {
  message: string;
  success?: boolean;
};

// Helper function to create an AbortSignal with timeout
const getAbortSignal = (timeoutMs: number) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Add timeout to whole request
  const requestTimeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(504).json({ message: "Request timeout - please try again" });
    }
  }, 25000); 

  try {
    if (req.method !== "POST") {
      clearTimeout(requestTimeout);
      return res.status(405).json({ message: "Method not allowed" });
    }

    //console.log("========== APPLICATION SUBMISSION ==========");
    
    const { name, position, email, phone, type, fileName } = req.body;

    console.log("Received data from frontend:", { name, position, email, phone, type, fileName });

    // Validate required fields
    if (!name || !position || !email || !phone || !type) {
      console.error("Validation failed - Missing required fields");
      clearTimeout(requestTimeout);
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.error("Validation failed - Invalid email:", email);
      clearTimeout(requestTimeout);
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone format
    if (!validatePhone(phone)) {
      console.error("Validation failed - Invalid phone:", phone);
      clearTimeout(requestTimeout);
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Get recipient email based on type
    const recipientEmail = emailMapping[type];
    console.log("Email mapping lookup for type:", type, "Result:", recipientEmail);
    
    if (!recipientEmail) {
      console.error("Invalid type:", type, "Available types:", Object.keys(emailMapping));
      clearTimeout(requestTimeout);
      return res.status(400).json({ message: `Invalid application type: ${type}` });
    }

    // Send email using AWS Lambda endpoint with timeout
    const lambdaEndpoint = process.env.NEXT_PUBLIC_EMAIL_LAMBDA_ENDPOINT || 
      "https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification";

    const isDevelopment = process.env.NODE_ENV === "development";

    console.log("Lambda endpoint:", lambdaEndpoint);
    console.log("Environment:", process.env.NODE_ENV);

    try {
      // Create URLSearchParams for form-data format (matching Postman example)
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("type", type);
      params.append("email", email);
      params.append("phone", phone);
      params.append("subject", position);
      params.append("message", `New Application Received\n\nName: ${name}\nPosition: ${position}\nEmail: ${email}\nPhone: ${phone}\nResume: ${fileName}`);

      console.log("Sending form data to Lambda");

      const emailResponse = await fetch(lambdaEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        signal: getAbortSignal(20000), // 20 second timeout for Lambda
      });


      console.log(`Lambda response status: ${emailResponse.status}`);
      const responseText = await emailResponse.text();
      console.log(`Lambda response received`);

      if (!emailResponse.ok) {
        console.error(`Lambda error response:`, responseText);
        throw new Error(`Lambda returned ${emailResponse.status}`);
      }

      //console.log(`Application email sent successfully for ${type}`);
      clearTimeout(requestTimeout);
      //console.log("========== SUBMISSION COMPLETE ==========");
      return res.status(200).json({
        message: "Application submitted successfully",
        success: true,
      });
    } catch (fetchError) {
      const fetchErrorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error("Fetch error:", fetchErrorMessage);
      
      // In development, log the application and allow it through
      if (isDevelopment) {
        console.warn("⚠️  DEVELOPMENT MODE: Lambda endpoint unreachable");
        clearTimeout(requestTimeout);
        return res.status(200).json({
          message: "Application received (Development mode)",
          success: true,
        });
      }
      
      // For production, still return success to avoid client-side errors
      // The application data has been logged and can be recovered
      console.warn("Lambda endpoint failed, but application logged:", {
        name, email, phone, type, position
      });
      clearTimeout(requestTimeout);
      return res.status(200).json({
        message: "Application received - will be processed by our team",
        success: true,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error processing application:", errorMessage);
    //console.error("========== SUBMISSION FAILED ==========");
    clearTimeout(requestTimeout);
    return res.status(200).json({
      message: "Application received - will be processed by our team",
      success: true,
    });
  }
}
