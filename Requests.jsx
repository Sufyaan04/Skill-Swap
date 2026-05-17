import { useEffect, useState } from "react";
import API from "../services/api";

const Requests = () => {
  const [tab, setTab] = useState("received");
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [r, s] = await Promise.all([
          API.get("/requests/received"),
          API.get("/requests/sent"),
        ]);
        setReceived(r.data); setSent(s.data);
      } catch {}
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleAction = async (id, status) => {
    setActionLoading(id + status);
    try {
      await API.put(`/requests/${id}`, { status });
      setReceived(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    } catch { alert("Action failed."); }
    finally { setActionLoading(null); }
  };

  const getInitials = (name) =>
    name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const current = tab === "received" ? received : sent;
  const pendingCount = received.filter(r => r.status === "pending").length;

  const StatusBadge = ({ status }) => (
    <span className={`ss-badge ss-badge-${status}`}>{status}</span>
  );

  return (
    <div className="ss-page">
      <div className="ss-page-header">
        <h1 className="ss-page-title">Requests</h1>
        <p className="ss-page-desc">Manage your incoming and outgoing skill swap proposals</p>
      </div>

      <div className="ss-card">
        {/* Tabs */}
        <div className="ss-tabs">
          <button
            className={`ss-tab ${tab === "received" ? "ss-tab--active" : ""}`}
            onClick={() => setTab("received")}
          >
            Received
            {pendingCount > 0 && <span className="ss-tab-badge">{pendingCount}</span>}
          </button>
          <button
            className={`ss-tab ${tab === "sent" ? "ss-tab--active" : ""}`}
            onClick={() => setTab("sent")}
          >
            Sent
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="ss-loading"><div className="ss-spinner ss-spinner-lg" /></div>
        ) : current.length === 0 ? (
          <div className="ss-empty">
            <div className="ss-empty-icon">📭</div>
            <p className="ss-empty-title">No {tab} requests</p>
            <p className="ss-empty-desc">
              {tab === "received"
                ? "Swap requests from others will appear here."
                : "Go to the dashboard to send swap requests."}
            </p>
          </div>
        ) : (
          <div className="ss-table-wrap">
            <table className="ss-table">
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Offering</th>
                  <th>Requesting</th>
                  <th>Status</th>
                  <th>Date</th>
                  {tab === "received" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {current.map(req => {
                  const person = tab === "received" ? req.sender : req.receiver;
                  return (
                    <tr key={req._id}>
                      <td>
                        <div className="ss-person-cell">
                          <div className="ss-mini-avatar">{getInitials(person?.name)}</div>
                          <div>
                            <p className="ss-person-name">{person?.name}</p>
                            <p className="ss-person-email">{person?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="ss-tag-offer">{req.skillOffered || "—"}</span></td>
                      <td><span className="ss-tag-want">{req.skillRequested || "—"}</span></td>
                      <td><StatusBadge status={req.status} /></td>
                      <td className="ss-date">
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>
                      {tab === "received" && (
                        <td>
                          {req.status === "pending" ? (
                            <div className="ss-row-actions">
                              <button
                                className="ss-btn ss-btn-accept ss-btn-sm"
                                disabled={!!actionLoading}
                                onClick={() => handleAction(req._id, "accepted")}
                              >
                                {actionLoading === req._id + "accepted" ? <span className="ss-spinner" /> : "Accept"}
                              </button>
                              <button
                                className="ss-btn ss-btn-reject ss-btn-sm"
                                disabled={!!actionLoading}
                                onClick={() => handleAction(req._id, "rejected")}
                              >
                                {actionLoading === req._id + "rejected" ? <span className="ss-spinner" /> : "Reject"}
                              </button>
                            </div>
                          ) : <span className="ss-dash">—</span>}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;