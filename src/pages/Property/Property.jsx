import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import { AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";

import { getProperty, removeBooking } from "../../services/api";
import useAuthCheck from "../../hooks/useAuthCheck";
import pluralize from "../../utils/pluralize";
import Map from "../../components/Map/Map";
import BookingModal from "../../components/BookingModal/BookingModal";
import FavoriteHeart from "../../components/FavoriteHeart/FavoriteHeart";
import UserDetailContext from "../../context/UserDetailContext";
import "./Property.css";

function Property() {
  const params = useParams();
  const { propertyId } = params;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getProperty(propertyId),
  });

  const [opened, { open, close }] = useDisclosure(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(propertyId, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== propertyId),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <FavoriteHeart id={propertyId} />
        </div>
        <img src={data?.image} alt={data?.title} />
        <div className="flexCenter property-details">
          <div className="flexColStart first">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <p className="orangeText">$ {data?.price}</p>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="var(--primary-text)" />

                <span>
                  {pluralize(
                    data?.facilities?.bathrooms,
                    "Bathroom",
                    "Bathrooms"
                  )}
                </span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="var(--primary-text)" />

                <span>
                  {pluralize(data?.facilities?.parking, "Parking", "Parkings")}
                </span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="var(--primary-text)" />
                <span>
                  {pluralize(data?.facilities?.bedrooms, "Room", "Rooms")}
                </span>
              </div>
            </div>

            <div className="secondaryText desc">{data?.description}</div>

            <div className="flexStart location">
              <MdLocationPin size={25} />
              <div className="secondaryText">
                <span>{data?.address}</span>
                <span>{data?.city}</span>
              </div>
            </div>

            {bookings?.map((booking) => booking.id).includes(propertyId) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel a booking</span>
                </Button>
                <span>
                  You have already booked it for&nbsp;
                  {
                    bookings?.filter((booking) => booking.id === propertyId)[0]
                      .date
                  }
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && open();
                }}
              >
                Book your visit
              </button>
            )}

            <BookingModal
              opened={opened}
              onClose={close}
              email={user?.email}
              propertyId={propertyId}
            />
          </div>

          <div className="flexColStart map">
            <Map address={data.address} city={data.city} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
