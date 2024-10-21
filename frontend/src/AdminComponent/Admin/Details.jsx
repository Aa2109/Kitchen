import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../State/Restaurant/Action";

const Details = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("restaurantdetails: ", restaurant.userRestaurants[0]);
  console.log("restaurantdetails Open: ", restaurant.userRestaurants[0].name);

  const dispatch = useDispatch();

  const handleRestaurantStatus = async (e) => {
    console.log("handleRestaurantStatus clicked");
    e?.preventDefault();
    dispatch(
      await updateRestaurantStatus({
        restaurantId: restaurant.userRestaurants[0]?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.userRestaurants[0]?.name}
        </h1>
        <div>
          <Button
            color={!restaurant.userRestaurants[0]?.open ? "primary" : "error"}
            className="py-[1rem] px-[2rem"
            variant="contained"
            onClick={handleRestaurantStatus}
            size="large"
          >
            {restaurant.userRestaurants[0]?.open ? "Close" : "Open"}
          </Button>
        </div>
      </div>
           <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
             <CardHeader title={<span className="text-gray-300"><strong>Restaurant:</strong></span>} />
             <CardContent>
               <div className="space-y-4 text-gray-200">
                 <div className="flex">
                   <p className="w-48"><strong>Owner:</strong></p>
                   <p className="text-gray-400">
                     <span className="pr-5">-</span>
                     {restaurant.userRestaurants[0]?.owner.fullName}
                   </p>
                 </div>
                 <div className="flex">
                   <p className="w-48"><strong>Restaurant Name:</strong></p>
                   <p className="text-gray-400">
                     <span className="pr-5">-</span>
                     {restaurant.userRestaurants[0]?.name}
                   </p>
              </div>
                <div className="flex">
                  <p className="w-48"><strong>Cuisine Type:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Opening Hours:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Status:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.open ?
                      <span className="px-5 py-2 rounded-full bg-green-500 text-gray-950">
                        Open
                      </span>
                    :
                      <span className="px-5 py-2 rounded-full bg-red-500 text-gray-950">
                        Closed
                      </span>
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

              <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300"><strong>Address:</strong></span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48"><strong>Country:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.address.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>State/Province:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.address.stateProvince}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>City:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.address.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Postal Code:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.address.postalCode}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Street Address:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300"><strong>Contact:</strong></span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48"><strong>Email:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Mobile:</strong></p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.userRestaurants[0]?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48"><strong>Social:</strong></p>
                  <div className="flex text-gray-400 items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a href={restaurant.userRestaurants[0]?.contactInformation.instagram}>
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href={restaurant.userRestaurants[0]?.contactInformation.twitter}>
                      <XIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href={restaurant.userRestaurants[0]?.contactInformation.linkedIn}>
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href={restaurant.userRestaurants[0]?.contactInformation.facebook}>
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
