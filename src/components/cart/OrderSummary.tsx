function OrderSummary() {
  return (
    <div>
      <div className="mt-0 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Price (2 Items)</div>
            <div className="text-sm font-medium text-gray-900">₹5499.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Discount</div>
            <div className="text-sm font-medium text-green-600/80">
              - ₹1669.00
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 text-sm text-gray-600">
              Delivery
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#4b5563"
                viewBox="0 0 256 256"
              >
                <path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"></path>
              </svg>
            </div>
            <dd className="text-sm font-normal text-green-600/80">Free</dd>{" "}
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Additional Discount</dt>{" "}
            <dd className="text-sm font-semibold text-gray-900">15%</dd>{" "}
          </div>
          <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
            <dt className="text-base font-medium text-gray-900">
              Total Amount
            </dt>{" "}
            <dd className="text-base font-semibold text-gray-900">₹3447</dd>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-emerald-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-500/95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Place Order
          </button>
        </div>
        <div className="mt-3">
          <p className="text-[1rem] font-semibold text-emerald-600">
            You will Save ₹1669 on this order
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
