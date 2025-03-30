import { useEffect, useState } from "react";
import { Bell, Users, Utensils, AlertTriangle, Search, Plus, Filter } from "lucide-react";
import axios from 'axios';

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [notification, setNotification] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);

  const [foodItems, setFoodItems] = useState([]);

  const [complaints, setComplaints] = useState([
    { id: 1, user: "Jane Doe", issue: "Food quality issue", status: "Open", date: "2025-03-25" },
    { id: 2, user: "Michael Brown", issue: "Delivery delay", status: "Resolved", date: "2025-03-22" },
    { id: 3, user: "Sarah Wilson", issue: "Missing items", status: "In Progress", date: "2025-03-28" }
  ]);






  const toggleUserStatus = async (_id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";

    try {
      await axios.put(`http://localhost:3006/admin/update-user-status`, {
        userId: _id,
        status: newStatus
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        },
      });

      // Update UI after successful API call
      setUsers(users.map(user =>
        user._id === _id ? { ...user, status: newStatus } : user
      ));

    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };






  const handleSendNotification = async () => {
    if (!notification.trim()) return;

    const response = await axios.post('http://localhost:3006/admin/send-notification', { notification }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      },
    });

    setNotification("");
  };



  const getStatusClass = (status) => {
    const classes = {
      "Active": "admin-dashboard-badge-green",
      "Available": "admin-dashboard-badge-green",
      "Blocked": "admin-dashboard-badge-red",
      "Sold-Out": "admin-dashboard-badge-red",
      "Open": "admin-dashboard-badge-yellow",
      "Resolved": "admin-dashboard-badge-blue",
      "In Progress": "admin-dashboard-badge-purple"
    };
    return `admin-dashboard-badge ${classes[status] || "admin-dashboard-badge-gray"}`;
  };



  useEffect(() => {

    axios.get("http://localhost:3006/admin/admin-main", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`, // Add token from local storage
      },
    })
      .then(response => {
        setUsers(response.data.user);
        setFoodItems(response.data.food);
        console.log(response.data);


      })
      .catch(error => {
        console.error("Error:", error)

      });

  }, [])














  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <div className="admin-dashboard-header-actions">
            <Bell className="admin-dashboard-icon" />
            <div className="admin-dashboard-avatar">A</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="admin-dashboard-main">
        <div className="admin-dashboard-card">
          {/* Tabs */}
          <div className="admin-dashboard-tabs-header">
            <div className="admin-dashboard-tabs-list">
              <button
                className={`admin-dashboard-tab ${activeTab === "users" ? "admin-dashboard-tab-active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="admin-dashboard-tab-icon" /> <span>Users</span>
              </button>
              <button
                className={`admin-dashboard-tab ${activeTab === "food" ? "admin-dashboard-tab-active" : ""}`}
                onClick={() => setActiveTab("food")}
              >
                <Utensils className="admin-dashboard-tab-icon" /> <span>Food Items</span>
              </button>
              <button
                className={`admin-dashboard-tab ${activeTab === "complaints" ? "admin-dashboard-tab-active" : ""}`}
                onClick={() => setActiveTab("complaints")}
              >
                <AlertTriangle className="admin-dashboard-tab-icon" /> <span>Complaints</span>
              </button>
              <button
                className={`admin-dashboard-tab ${activeTab === "notifications" ? "admin-dashboard-tab-active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="admin-dashboard-tab-icon" /> <span>Notifications</span>
              </button>
            </div>
          </div>

          <div className="admin-dashboard-tab-content">
            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="admin-dashboard-section">
                <div className="admin-dashboard-section-header">
                  <h2 className="admin-dashboard-section-title">User Management</h2>
                  <div className="admin-dashboard-section-actions">
                    <div className="admin-dashboard-search">
                      <Search className="admin-dashboard-search-icon" />
                      <input
                        type="text"
                        className="admin-dashboard-input"
                        placeholder="Search users..."
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-dashboard-table-container">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th className="admin-dashboard-th">ID</th>
                        <th className="admin-dashboard-th">Name</th>
                        <th className="admin-dashboard-th">Email</th>
                        <th className="admin-dashboard-th">Role</th>
                        <th className="admin-dashboard-th">Status</th>
                        <th className="admin-dashboard-th">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id} className="admin-dashboard-tr">
                          <td className="admin-dashboard-td">{user._id.slice(-7)}</td>
                          <td className="admin-dashboard-td admin-dashboard-td-bold">{user.username}</td>
                          <td className="admin-dashboard-td">{user.email}</td>
                          <td className="admin-dashboard-td">{user.role}</td>
                          <td className="admin-dashboard-td">
                            <span className={getStatusClass(user.status)}>
                              {user.status}
                            </span>
                          </td>
                          <td className="admin-dashboard-td">
                            <button
                              className={`admin-dashboard-button admin-dashboard-button-sm ${user.status === "Active" ? "admin-dashboard-button-danger" : "admin-dashboard-button-success"}`}
                              onClick={() => toggleUserStatus(user._id, user.status)}
                            >
                              {user.status === "Active" ? "Block" : "Unblock"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Food Tab */}
            {activeTab === "food" && (
              <div className="admin-dashboard-section">
                <div className="admin-dashboard-section-header">
                  <h2 className="admin-dashboard-section-title">Food Inventory</h2>
                  <div className="admin-dashboard-section-actions">
                    <button className="admin-dashboard-button admin-dashboard-button-secondary">
                      <Filter className="admin-dashboard-button-icon" /> Filter
                    </button>
                    <button className="admin-dashboard-button admin-dashboard-button-primary">
                      <Plus className="admin-dashboard-button-icon" /> Add Item
                    </button>
                  </div>
                </div>

                <div className="admin-dashboard-table-container">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th className="admin-dashboard-th">ID</th>
                        <th className="admin-dashboard-th">Name</th>
                        <th className="admin-dashboard-th">Category</th>
                        <th className="admin-dashboard-th">Price</th>
                        <th className="admin-dashboard-th">Quantity</th>
                        <th className="admin-dashboard-th">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodItems.map(item => (
                        <tr key={item._id} className="admin-dashboard-tr">
                          <td className="admin-dashboard-td">{item._id.slice(-7)}</td>
                          <td className="admin-dashboard-td admin-dashboard-td-bold">{item.mealname}</td>
                          <td className="admin-dashboard-td">{item.category}</td>
                          <td className="admin-dashboard-td">{item.price}</td>
                          <td className="admin-dashboard-td">{item.quantity}</td>
                          {/* <td className="admin-dashboard-td">{item.status}</td> */}
                          <td className="admin-dashboard-td">
                            <span className={getStatusClass(item.status)}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Complaints Tab */}
            {activeTab === "complaints" && (
              <div className="admin-dashboard-section">
                <div className="admin-dashboard-section-header">
                  <h2 className="admin-dashboard-section-title">Customer Complaints</h2>
                  <div className="admin-dashboard-search">
                    <Search className="admin-dashboard-search-icon" />
                    <input
                      type="text"
                      className="admin-dashboard-input"
                      placeholder="Search complaints..."
                    />
                  </div>
                </div>

                <div className="admin-dashboard-table-container">
                  <table className="admin-dashboard-table">
                    <thead>
                      <tr>
                        <th className="admin-dashboard-th">ID</th>
                        <th className="admin-dashboard-th">User</th>
                        <th className="admin-dashboard-th">Issue</th>
                        <th className="admin-dashboard-th">Date</th>
                        <th className="admin-dashboard-th">Status</th>
                        <th className="admin-dashboard-th">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map(complaint => (
                        <tr key={complaint.id} className="admin-dashboard-tr">
                          <td className="admin-dashboard-td">{complaint.id}</td>
                          <td className="admin-dashboard-td admin-dashboard-td-bold">{complaint.user}</td>
                          <td className="admin-dashboard-td">{complaint.issue}</td>
                          <td className="admin-dashboard-td">{complaint.date}</td>
                          <td className="admin-dashboard-td">
                            <span className={getStatusClass(complaint.status)}>
                              {complaint.status}
                            </span>
                          </td>
                          <td className="admin-dashboard-td">
                            <button className="admin-dashboard-button admin-dashboard-button-sm admin-dashboard-button-info">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="admin-dashboard-section">
                <h2 className="admin-dashboard-section-title">Send Notification</h2>
                <div className="admin-dashboard-notification-card">
                  <div className="admin-dashboard-form-group">
                    <label className="admin-dashboard-label">Recipients</label>
                    <div className="admin-dashboard-button-group">
                      <button className="admin-dashboard-button admin-dashboard-button-outline admin-dashboard-button-active">All Users</button>
                      <button className="admin-dashboard-button admin-dashboard-button-outline">Admins Only</button>
                      <button className="admin-dashboard-button admin-dashboard-button-outline">Active Users</button>
                    </div>
                  </div>

                  <div className="admin-dashboard-form-group">
                    <label className="admin-dashboard-label">Message</label>
                    <textarea name="" id="" className="admin-dashboard-input"
                      value={notification}
                      onChange={(e) => setNotification(e.target.value)}
                      placeholder="Enter notification message..."></textarea>
                  </div>

                  <div className="admin-dashboard-form-actions">
                    <button
                      className="admin-dashboard-button admin-dashboard-button-primary"
                      onClick={handleSendNotification}
                      disabled={!notification.trim()}
                    >
                      <Bell className="admin-dashboard-button-icon" /> Send Notification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}