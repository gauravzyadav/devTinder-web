import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests((await res).data.data))

    } catch (err) {
      //
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [])


  if (!requests) return;

  if (requests.length == 0)
    return <h1 className="text-bold text-2xl">No Request Found</h1>;

  return (
    <div className=" text-center my-5 ">
      <h1 className="text-bold text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, gender, photoUrl, age, about } =
          request.fromUserId;

        return (
          <div key ={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/4 mx-auto">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + "," + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
            <button class="btn btn-primary mx-2">Reject</button>
            <button class="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
