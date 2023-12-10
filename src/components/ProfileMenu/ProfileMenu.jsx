import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar } from "@mantine/core";

function ProfileMenu({ user }) {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    localStorage.clear();

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius="xl" size="md" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("favorites", { replace: true })}>
          Favorites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
