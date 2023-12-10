import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { toast } from "react-toastify";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../services/api";
import { getFormattedDate } from "../../utils/common";

function BookingModal({ opened, onClose, email, propertyId }) {
  const [date, setDate] = useState([null, null]);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", { position: "bottom-right" });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: getFormattedDate(date),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      bookVisit(getFormattedDate(date), propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => onClose(),
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Select your date of visit"
      centered
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        },
      }}
    >
      <DatePicker
        type="range"
        allowSingleDateInRange
        value={date}
        onChange={setDate}
        minDate={new Date()}
      />
      <Button disabled={!date[0] || isLoading} onClick={() => mutate()}>
        Book visit
      </Button>
    </Modal>
  );
}

export default BookingModal;
