import { Mail, MoreVertical, Trash, User } from "lucide-react"; // Import necessary icons
import { Link } from "react-router-dom";

const AgentCard = ({ id, name, image, email, phone, username, governmentId }) => {
  

  const handleDelete = () => {
    console.log("Deleted");
  };

  const click =()=>{

    localStorage.removeItem("newuser")
    localStorage.setItem("newuser", email);
  }
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm w-full max-w-md">
      {/* Left Section: Profile Picture and Info */}
      <Link to={`/agents/${id}`} className="flex items-center space-x-4 flex-grow" onClick={click}>
        <User
          src={image || '../profile.png'}
          alt={name || ' '}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{username || 'Unnamed Agent'}</h3>
          <p className="text-xs text-gray-500">{username || 'No username'}</p>
         
           <p className="text-xs text-blue-600 hover:underline">View profile</p>
        </div>
         
      </Link>

      {/* Right Section: Icons (Vertically stacked) */}
      <div className="flex flex-col items-start space-y-2">
        {/* Email Button */}
        <button
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Send email"
          title={email || 'No email available'}
        >
          <Mail className="h-4 w-4" />
        </button>

        {/* Phone Button */}
        <button
           className="rounded-full p-1 text-red-600 hover:bg-red-100 hover:text-red-800"
           aria-label="Delete"
           onClick={handleDelete}  >
          <Trash className="h-4 w-4" />
        </button>

        {/* More Options Button */}
        <button
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
