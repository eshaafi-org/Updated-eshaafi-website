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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("========== APPLICATION SUBMISSION ==========");
    
    const { name, position, email, phone, type, fileName } = req.body;

    console.log("Received data from frontend:", { name, position, email, phone, type, fileName });

    // Validate required fields
    if (!name || !position || !email || !phone || !type) {
      console.error("Validation failed - Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.error("Validation failed - Invalid email:", email);
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone format
    if (!validatePhone(phone)) {
      console.error("Validation failed - Invalid phone:", phone);
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Get recipient email based on type
    const recipientEmail = emailMapping[type];
    console.log("Email mapping lookup for type:", type, "Result:", recipientEmail);
    
    if (!recipientEmail) {
      console.error("Invalid type:", type, "Available types:", Object.keys(emailMapping));
      return res.status(400).json({ message: `Invalid application type: ${type}` });
    }

    // Send email using AWS Lambda endpoint
    const lambdaEndpoint = process.env.NEXT_PUBLIC_EMAIL_LAMBDA_ENDPOINT || 
      "https://iwwdljbs5.execute-api.us-east-1.amazonaws.com/stage/admin/emailWebsite/notification";

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

      console.log("Sending form data to Lambda:");
      console.log("  name:", name);
      console.log("  type:", type);
      console.log("  email:", email);
      console.log("  phone:", phone);
      console.log("  subject:", position);
      console.log("  message:", `New Application Received\n\nName: ${name}\nPosition: ${position}\nEmail: ${email}\nPhone: ${phone}\nResume: ${fileName}`);

      const emailResponse = await fetch(lambdaEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      console.log(`Lambda response status: ${emailResponse.status}`);
      const responseText = await emailResponse.text();
      console.log(`Lambda response body:`, responseText);

      if (!emailResponse.ok) {
        console.error(`Lambda error response:`, responseText);
        throw new Error(`Lambda returned ${emailResponse.status}: ${responseText}`);
      }

      console.log(`Application email sent successfully for ${type}`);
    } catch (fetchError) {
      const fetchErrorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error("Fetch error:", fetchErrorMessage);
      
      // In development, log the application and allow it through
      if (isDevelopment) {
        console.warn("⚠️  DEVELOPMENT MODE: Lambda endpoint unreachable, but application data logged successfully");
        console.log("📝 Application Details:");
        console.log(`  Name: ${name}`);
        console.log(`  Position: ${position}`);
        console.log(`  Email: ${email}`);
        console.log(`  Phone: ${phone}`);
        console.log(`  Type: ${type}`);
        console.log(`  Resume: ${fileName}`);
        console.log(`  Should be sent to: ${recipientEmail}`);
        
        // Allow submission to proceed in development
        return res.status(200).json({
          message: "Application received (Development mode - Lambda endpoint not reachable, but data logged)",
          success: true,
        });
      }
      
      throw new Error(`Failed to reach Lambda endpoint: ${fetchErrorMessage}`);
    }

    console.log("========== SUBMISSION COMPLETE ==========");
    return res.status(200).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error processing application:", errorMessage);
    console.error("========== SUBMISSION FAILED ==========");
    return res.status(500).json({
      message: `Failed to process application: ${errorMessage}`,
    });
  }
}
