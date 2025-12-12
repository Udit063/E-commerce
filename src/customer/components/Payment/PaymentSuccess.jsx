import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { orderId } = useParams();

  const dispatch = useDispatch();
  //@ts-ignore
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);

    setPaymentId(urlParam.get("razorpay_payment_link_id"));
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
  }, []);

  return <div></div>;
};

export default PaymentSuccess;
