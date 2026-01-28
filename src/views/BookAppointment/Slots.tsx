"use client";
// dependencies
import { useState, useReducer, memo, useEffect } from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import style from "../../styles/bookAppointment.module.scss";
import moment from "moment";
//
const slotsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "API_INIT": {
      return {
        ...state,
        apiLoading: true,
        docId: action.payload,
      };
    }
    case "API_SUCC": {
      return {
        ...state,
        apiLoading: false,
        apiData: action.payload,
      };
    }
    case "API_REJECT": {
      return {
        ...state,
        apiLoading: false,
        uploadLoading: false,
        error: true,
        errorData: action.payload,
      };
    }
    case "UPLOAD_LOADING": {
      return {
        ...state,
        uploadLoading: true,
      };
    }
    case "UPLOAD_LOADING_FALSE": {
      return {
        ...state,
        uploadLoading: false,
      };
    }
    case "APPOINTMENT_SLOTS": {
      return {
        ...state,
        appointmentSlots: action.payload,
        apiData: [...state.apiData],
      };
    }
    case "SHARE_SLOTS": {
      return {
        ...state,
        appointmentSlots: action.payload,
      };
    }
    case "morning": {
      return {
        ...state,
        slots: state.appointmentSlots.morning_slots,
      };
    }
    case "afternoon": {
      return {
        ...state,
        slots: state.appointmentSlots.afternoon_slots,
      };
    }
    case "evening": {
      return {
        ...state,
        slots: state.appointmentSlots.evening_slots,
      };
    }
    default: {
      console.log("hello");
    }
  }
};
function Slots({
  Items = [],
  setAppointDate,
  appointDate,
  activeSlot,
  setSlot,
}: {
  Items: any[];
  setAppointDate: any;
  appointDate: any;
  activeSlot: any;
  setSlot: any;
}) {
  // console.log(Items);
  const [timeSlots, setTimeSlots] = useReducer(slotsReducer, {
    apiLoading: false,
    apiData: [],
    error: false,
    errorData: "",
    uploadLoading: false,
    appointmentSlots: {
      morning_slots: [],
      evening_slots: [],
      afternoon_slots: [],
    },
    slots: [],
  });
  // extracting state from time slots
  const { slots, appointmentSlots } = timeSlots;
  // declaring day time state
  const [dayTime, setDayTime] = useState("");
  // handling appointment slots
  const handleAppointSlots = (data: any) => {
    setTimeSlots({
      type: "APPOINTMENT_SLOTS",
      payload: data,
    });
  };
  // handling of slots changing
  const handleDayChange = (e: any, day: any) => {
    setAppointDate(e.target.value);
    setTimeSlots({ type: "SHARE_SLOTS", payload: day.appointment_slots });
    if (day.appointment_slots?.morning_slots?.length > 0) {
      setDayTime("morning");
      setTimeSlots({ type: "morning" });
    } else if (day.appointment_slots?.afternoon_slots?.length > 0) {
      setDayTime("afternoon");
      setTimeSlots({ type: "afternoon" });
    } else {
      setDayTime("evening");
      setTimeSlots({ type: "evening" });
    }
  };
  // slots section
  const handleSlotsChange = (value: string) => {
    setDayTime(value);
    if (value === "morning") {
      setTimeSlots({ type: "morning" });
    } else if (value === "afternoon") {
      setTimeSlots({ type: "afternoon" });
    } else {
      setTimeSlots({ type: "evening" });
    }
  };
  // getting slots value
  const getSlotValue = (slot: any) => {
    const availability_status = slot.booked ? "booked" : slot.locked ? "locked" : "available";
    setSlot({ id: slot.appointmentSlotId, time: slot.start, availability_status });
  };
  useEffect(() => {
    setTimeSlots({ type: "SHARE_SLOTS", payload: Items[0].appointment_slots });
    if (Items[0].appointment_slots?.morning_slots?.length > 0) {
      setTimeSlots({ type: "morning" });
      setDayTime("morning");
    } else if (Items[0].appointment_slots?.afternoon_slots?.length > 0) {
      setTimeSlots({ type: "afternoon" });
      setDayTime("afternoon");
    } else {
      setTimeSlots({ type: "evening" });
      setDayTime("evening");
    }
  }, [Items]);
  return (
    <div className={style.schedule}>
      <span className="d-flex align-items-center justify-content-between">
        <h5 className="fw-bold text-gray">Schedule</h5>
        <FaRegCalendarCheck style={{ fontSize: "1.5rem", color: "#7B8D9E" }} />
      </span>
      <div className="d-flex flex-column ">
        <div className="d-flex flex-column mb-1 w-100">
          <div className="d-flex flex-column border-bottom pb-1 w-100">
            <div className={style.scrollmenu + " d-flex "}>
              {Items?.map((i, index) => (
                <span
                  onClick={() => handleAppointSlots(i.appointment_slots)}
                  key={index}
                >
                  <input
                    type="radio"
                    className={style.btnCheck}
                    name="appointDate"
                    id={i.slot_date}
                    value={i.slot_date}
                    onChange={(e) => handleDayChange(e, i)}
                  />
                  <label
                    className={`${style.btn} ${style.labelrdioclass} ${
                      style.date_focused
                    } d-flex flex-column justify-content-center align-items-center text-gray p-1 fw-bold text-capitalize ${
                      appointDate === i.slot_date && style.labelActive
                    }`}
                    htmlFor={i.slot_date}
                    style={{ height: "84px", width: "77px" }}
                  >
                    <p className="m-0 text-gray" style={{ fontSize: "14px" }}>
                      {moment(i.slot_date).format("DD,MMM")}
                    </p>
                    <p
                      style={{ fontSize: "14px" }}
                      className="capitalize text-gray"
                    >
                      {i.slot_day.slice(0, 3)}
                    </p>
                  </label>
                </span>
              ))}
            </div>
          </div>
          <div
            className={style.days + " bg-gray d-flex justify-content-between "}
          >
            <input
              type="checkbox"
              name="slots"
              id="morning"
              value={"morning"}
              className={style.btnCheck}
              onChange={(e) => handleSlotsChange(e.target.value)}
            />
            <label
              htmlFor="morning"
              className={` ${style.dayText}
              ${style.btn} 
              ${style.slotLabelradioclass} 
              ${style.date_focused}
              ${dayTime === "morning" ? style.slotLabelActive : " "}`}
            >
              Morning
            </label>
            <input
              type="checkbox"
              name="slots"
              id="afternoon"
              value={"afternoon"}
              className={style.btnCheck}
              onChange={(e) => handleSlotsChange(e.target.value)}
            />
            <label
              htmlFor="afternoon"
              className={` ${style.dayText}
              ${style.slotLabelradioclass}  
              ${style.date_focused}
              ${dayTime === "afternoon" ? style.slotLabelActive : " "}`}
            >
              Afternoon
            </label>

            <input
              type="checkbox"
              name="slots"
              value={"evening"}
              id="evening"
              className={style.btnCheck}
              onChange={(e) => handleSlotsChange(e.target.value)}
            />
            <label
              htmlFor="evening"
              className={` ${style.dayText}
              ${style.btn} 
              ${style.slotLabelradioclass} 
              ${style.date_focused}
              ${dayTime === "evening" ? style.slotLabelActive : " "}`}
            >
              Evening
            </label>
          </div>
          <ul className={style.slotsCont}>
            {slots?.length > 0 ? (
              slots.map((slot: any, indx: number) => (
                <li key={indx} className={style.slotItm}>
                  <input
                    type="radio"
                    className={style.btnCheck}
                    name="morningSlots"
                    id={slot.appointmentSlotId}
                    value={slot.appointmentSlotId}
                    onChange={() => getSlotValue(slot)}
                    disabled={slot.booked || slot.locked}
                    // selected={true}
                  />
                  <label
                    className={`${style.labelrdioclass}  ${
                      activeSlot.id === slot.appointmentSlotId &&
                      style.labelActive
                    } ${slot.booked ? style.bookedSlot : null}`}
                    htmlFor={slot.appointmentSlotId}
                  >
                    {moment(slot?.start, "HH:mm").format("h:mm A")}
                  </label>
                </li>
              ))
            ) : (
              <p className="text-center w-100 ">No slot remaining</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default memo(Slots);
