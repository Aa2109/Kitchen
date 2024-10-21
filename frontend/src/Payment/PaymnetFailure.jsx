import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import { green, red } from "@mui/material/colors";
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymnetFailure = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5">
          <ErrorIcon sx={{ fontSize: "5rem", color: red[500] }} />
          <h1 className="py-5 text-2xl font-semibold">Order Failed</h1>
          <p className="py-3 text-center to-gray-400">
            You can try it again as currently facing issues from paymnet related issues
          </p>
          <p className="py-2 text-center to-gray-200 text-lg">
            Have A Greate Day!
          </p>
          <div className="space-x-4">
          <Button
            onClick={()=>navigate("/cart")}
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0rem" }}
          >
            Go To Cart
          </Button>
          <Button
            onClick={()=>navigate("/contact-us")}
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0rem" }}
          >
            cContact us
          </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PaymnetFailure