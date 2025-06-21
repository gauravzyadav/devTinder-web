const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;
  
    return (
      <div className="card w-72 bg-base-300 border border-gray-300 rounded-lg shadow-md -mt-4">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
            className="h-70 w-full object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body p-3 py-2">
          <h2 className="card-title text leading-tight mb-1">
            {firstName + " " + lastName}
          </h2>
          {age && gender && <p className="mb-1">{age + ", " + gender}</p>}
          <p className="text-xs line-clamp-2">{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-s btn-primary">Ignore</button>
            <button className="btn btn-s btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  
