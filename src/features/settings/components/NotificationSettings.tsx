

export const NotificationSettings = ({  }) => {



    return (
      <div className="bg-white shadow rounded-lg p-6 min-w-[50rem]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Email notifications</h2>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-600">Turn global email notifications on or off</p>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              defaultChecked
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        <div className="py-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Your Profile & Uploads</h3>
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-purple-600" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">New Follower</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-purple-600" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">New Favorite</span>
            </label>
            {/* Repeat for other checkboxes */}
          </div>
        </div>
        <div className="py-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Comments</h3>
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-purple-600" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">New Comment</span>
            </label>
            {/* Repeat for other checkboxes */}
          </div>
        </div>
      </div>
    </div>
    );
  };
  