import React from "react";

const AddressCard = ({ address }) => {
  if (!address) {
    return (
      <div>
        <p className="text-gray-500 text-sm">No address provided</p>
      </div>
    );
  }

  const fullName = [address?.firstName, address?.lastName]
    .filter(Boolean)
    .join(" ");

  const addressParts = [
    address?.streetAddress,
    address?.city,
    address?.state,
    address?.zipCode,
  ].filter(Boolean);

  return (
    <div>
      <div className="space-y-3">
        {fullName && <p className="font-semibold">{fullName}</p>}
        {addressParts.length > 0 && (
          <p className="font-normal">{addressParts.join(", ")}</p>
        )}
        {address?.mobile && (
          <div className="space-y-1">
            <p className="font-semibold">Phone Number</p>
            <p className="font-normal">{address.mobile}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
