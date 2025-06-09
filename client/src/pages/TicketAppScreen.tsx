import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketAppScreen.css";
import { ticketService } from "../api/api";
import type { CreateTicketPayload, TicketType } from "../api/api";
import logoPng from "../assets/text-logo-white.png";

type UserRole = 'Admin' | 'User' | 'Staff';

interface TicketFormData {
    title: string;
    type: TicketType;
    description: string;
}

const STAFF_TICKET_TYPES: TicketType[] = [
    "Equipment maintenance request",
    "Supply replenishment",
    "Requesting missing patient records",
    "Compliance and safety",
    "Reports of patient accidents"
];

const CUSTOMER_TICKET_TYPES: TicketType[] = [
    "Account recovery",
    "Inquiries about dentalign",
    "Technical issues of website",
    "Billing/payment of appointments",
    "Filing complaint of service"
];

const TicketAppScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TicketFormData>({
        title: "",
        type: "Equipment maintenance request",
        description: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [ownerId, setOwnerId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    useEffect(() => {
        // Get the token from localStorage or sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            try {
                // Decode the JWT token to get user information
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const { id, role } = JSON.parse(jsonPayload);
                setOwnerId(id);
                setUserRole(role);
                // Set default type based on role
                if (role === 'Staff') {
                    setFormData(prev => ({ ...prev, type: STAFF_TICKET_TYPES[0] }));
                } else if (role === 'User') {
                    setFormData(prev => ({ ...prev, type: CUSTOMER_TICKET_TYPES[0] }));
                }
            } catch (e) {
                console.error("Failed to decode token:", e);
                setOwnerId(null);
                setUserRole(null);
            }
        } else {
            setOwnerId(null);
            setUserRole(null);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!ownerId) {
                setError("Please sign in to submit a ticket");
                setLoading(false);
                return;
            }

            // Submit the ticket
            const ticketData: CreateTicketPayload = {
                title: formData.title,
                type: formData.type,
                description: formData.description,
                assignee: "Unassigned", // Default assignee
                date_created: new Date().toISOString(),
                priority: "Medium", // Default priority
                status: "Unseen" // Default status
            };

            await ticketService.createTicket(ownerId, ticketData);

            // Redirect to tickets page on success
            navigate("/tickets");
        } catch (err) {
            setError("Failed to submit ticket. Please try again.");
            console.error("Error submitting ticket:", err);
        } finally {
            setLoading(false);
        }
    };

    const getTicketTypes = () => {
        if (userRole === 'Staff') {
            return STAFF_TICKET_TYPES;
        } else if (userRole === 'User') {
            return CUSTOMER_TICKET_TYPES;
        }
        return [];
    };

    const getFormAppearance = () => {
        if (userRole === 'Staff') {
            return {
                backgroundColor: '#f0f8ff', // Light blue background for staff
                borderColor: '#4682b4' // Steel blue border
            };
        } else if (userRole === 'User') {
            return {
                backgroundColor: '#fff0f5', // Lavender blush background for customers
                borderColor: '#db7093' // Pale violet red border
            };
        }
        return {};
    };

    return (
        <div className="ticket-app-screen">
            <div className="top_container">
                <div className="name">
                    <img className="logo" src={logoPng} alt="Logo" />
                    <h2>Dentalign</h2>
                </div>

                <p className="text">We would always love to upgrade our system, to <br /> provide the best experience for our loyal beloved <br />customers.</p>
            </div>

            <div className="bottom_container" style={getFormAppearance()}>
                <h1 className="what">What can we do for you?</h1>
                <h6 className="send">Submit a ticket, so you will have a <br /> better experience!</h6>

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title goes here..."
                            required
                        />

                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            {getTicketTypes().map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="description">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description goes here..."
                            required
                        ></textarea>

                        {error && <div className="error-message">{error}</div>}

                        <div className="buttons">
                            <button 
                                type="button" 
                                className="cancel_btn"
                                onClick={() => navigate("/tickets")}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="send_btn"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TicketAppScreen;