import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../services/api";

function BookingModal({ opened, onClose, email, propertyId }) {
  const [value, setValue] = useState(null);
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
        { id: propertyId, date: dayjs(value).format("DD/MM/YYYY") },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
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
      <DatePicker value={value} onChange={setValue} minDate={new Date()} />
      <Button disabled={!value || isLoading} onClick={() => mutate()}>
        Book visit
      </Button>
    </Modal>
  );
}

export default BookingModal;
