"use client";
// dependencies
import { useState, useReducer, memo } from "react";
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
  const { slots, appointmentSlots } = timeSlots;
  const [dayTime, setDayTime] = useState("");
  const handleAppointSlots = (data: any) => {
    setTimeSlots({
      type: "APPOINTMENT_SLOTS",
      payload: data,
    });
  };
  const handleDayChange = (e: any, day: any) => {
    setAppointDate(e.target.value);
    setTimeSlots({ type: "SHARE_SLOTS", payload: day.appointment_slots });
  };
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
  const getSlotValue = (val: any, time: any) => {
    console.log(val, time);
    setSlot({ id: val, time });
  };
  return (
    <div className={style.schedule}>
      <span className="flex items-center justify-between">
        <h5>Schedule</h5>
        <FaRegCalendarCheck style={{ fontSize: "1.5rem", color: "#7B8D9E" }} />
      </span>
      <div className="flex flex-col ">
        <div className="flex flex-col mb-1 w-full">
          <div className="flex flex-col border-bottom pb-1 w-full">
            <div className={style.scrollmenu + " flex "}>
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
                    } flex flex-col justify-center items-center p-1 font-bold ${
                      appointDate === i.slot_date && style.labelActive
                    }`}
                    htmlFor={i.slot_date}
                    style={{ height: "84px", width: "77px" }}
                  >
                    <p className="m-0 " style={{ fontSize: "14px" }}>
                      {moment(i.slot_date).format("DD,MMM")}
                    </p>
                    <p style={{ fontSize: "14px" }} className="capitalize ">
                      {i.slot_day.slice(0, 3)}
                    </p>
                  </label>
                </span>
              ))}
            </div>
          </div>
          <div
            className={
              style.days + " bg-gray rounded-50 flex justify-between p-1 mt-1"
            }
          >
            <input
              type="checkbox"
              name="slots"
              id="morning"
              value={"morning"}
              className={style.btnCheck}
              onChange={(e) => handleSlotsChange(e.target.value)}
              disabled={appointmentSlots?.morning_slots?.length < 1}
            />
            <label
              htmlFor="morning"
              className={`
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
              disabled={appointmentSlots?.afternoon_slots?.length < 1}
            />
            <label
              htmlFor="afternoon"
              className={`
              ${style.btn} 
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
              disabled={appointmentSlots.evening_slots.length < 1}
            />
            <label
              htmlFor="evening"
              className={`${style.slotLabelradioclass}  ${style.date_focused} ${
                dayTime === "evening" ? style.slotLabelActive : " "
              }`}
            >
              Evening
            </label>
          </div>
          <ul className={"flex mt-1 " + style.slotsCont}>
            {slots ? (
              slots.map((slot: any, indx: number) => (
                <li key={indx} className={style.slotItm}>
                  <input
                    type="radio"
                    className={style.btnCheck}
                    name="morningSlots"
                    id={slot.appointmentSlotId}
                    value={slot.appointmentSlotId}
                    onChange={(e) => getSlotValue(e.target.value, slot.start)}
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
              <p className="text-center w-full">No slot remaining</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default memo(Slots);
