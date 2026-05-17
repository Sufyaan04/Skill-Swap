import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [skill, setSkill] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [stats, setStats] = useState({ sent: 0, received: 0, accepted: 0, pending: 0 });
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [skillOffered, setSkillOffered] = useState("");
  const [skillRequested, setSkillRequested] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s, r] = await Promise.all([
          API.get("/users/profile"),
          API.get("/requests/sent"),
          API.get("/requests/received"),
        ]);
        setProfile(p.data);
        const all = [...s.data, ...r.data];
        setStats({
          sent: s.data.length,
          received: r.data.length,
          accepted: all.filter(x => x.status === "accepted").length,
          pending: r.data.filter(x => x.status === "pending").length,
        });
      } catch {}
    };
    load();
  }, []);

  const handleSearch = async () => {
    if (!skill.trim()) return;
    setLoading(true); setSearched(true);
    try {
      const { data } = await API.get(`/users/search?skill=${skill}`);
      setUsers(data);
    } catch {}
    finally { setLoading(false); }
  };

  const openModal = (u) => {
    setSelectedUser(u); setSkillOffered("");
    setSkillRequested(""); setSuccessMsg(""); setModalOpen(true);
  };

  const handleSendRequest = async () => {
    if (!skillOffered.trim() || !skillRequested.trim()) return;
    setSendLoading(true);
    try {
      await API.post("/requests", {
        receiverId: selectedUser._id, skillOffered, skillRequested,
      });
      setSuccessMsg(`Request sent to ${selectedUser.name}!`);
      setTimeout(() => setModalOpen(false), 2000);
    } catch { setSuccessMsg("Failed. Try again."); }
    finally { setSendLoading(false); }
  };

  const getInitials = (name) =>
    name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const statCards = [
    { label: "Requests Sent", value: stats.sent, trend: "Total sent", icon: "↑" },
    { label: "Requests Received", value: stats.received, trend: "Total received", icon: "↓" },
    { label: "Accepted Swaps", value: stats.accepted, trend: "Completed exchanges", icon: "✓" },
    { label: "Pending", value: stats.pending, trend: "Awaiting response", icon: "◷" },
  ];

  return (
    <div className="ss-page">
      {/* Page Title */}
      <div className="ss-page-header">
        <h1 className="ss-page-title">Dashboard</h1>
        <p className="ss-page-desc">
          Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}. Here's your skill exchange overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="ss-stat-grid">
        {statCards.map((s, i) => (
          <div key={i} className="ss-stat-card">
            <div className="ss-stat-card-header">
              <span className="ss-stat-label">{s.label}</span>
              <span className="ss-stat-icon">{s.icon}</span>
            </div>
            <div className="ss-stat-value">{s.value ?? 0}</div>
            <p className="ss-stat-trend">{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Search Section */}
      <div className="ss-card">
        <div className="ss-card-header">
          <div>
            <h2 className="ss-card-title">Explore Skills</h2>
            <p className="ss-card-desc">Find people offering skills you want to learn</p>
          </div>
        </div>
        <div className="ss-card-body">
          <div className="ss-search">
            <svg className="ss-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="ss-search-input"
              placeholder="Search by skill — React, Python, Guitar..."
              value={skill}
              onChange={e => setSkill(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="ss-btn ss-btn-primary" onClick={handleSearch} disabled={loading}>
              {loading ? <span className="ss-spinner" /> : "Search"}
            </button>
          </div>

          <div className="ss-tags">
            {["React", "Python", "Design", "Data Science", "Marketing", "Guitar", "Spanish", "ML"].map(tag => (
              <button key={tag} className="ss-tag" onClick={() => setSkill(tag)}>{tag}</button>
            ))}
          </div>

          {searched && !loading && (
            <div className="ss-results">
              <p className="ss-results-meta">
                {users.length === 0 ? "No users found." : `${users.length} result${users.length > 1 ? "s" : ""} found`}
              </p>
              <div className="ss-user-grid">
                {users.map(u => (
                  <div key={u._id} className="ss-user-card">
                    <div className="ss-user-card-top">
                      <div className="ss-user-avatar">{getInitials(u.name)}</div>
                      <div>
                        <p className="ss-user-name">{u.name}</p>
                        <p className="ss-user-email">{u.email}</p>
                      </div>
                    </div>
                    {u.skillsOffered?.length > 0 && (
                      <div className="ss-skill-row">
                        <span className="ss-skill-label">Offers</span>
                        <div className="ss-skill-tags">
                          {u.skillsOffered.map((s, i) => <span key={i} className="ss-tag-offer">{s}</span>)}
                        </div>
                      </div>
                    )}
                    {u.skillsWanted?.length > 0 && (
                      <div className="ss-skill-row">
                        <span className="ss-skill-label">Wants</span>
                        <div className="ss-skill-tags">
                          {u.skillsWanted.map((s, i) => <span key={i} className="ss-tag-want">{s}</span>)}
                        </div>
                      </div>
                    )}
                    <div className="ss-user-card-actions">
                      <button className="ss-btn ss-btn-outline ss-btn-sm" onClick={() => navigate(`/profile/${u._id}`)}>
                        View Profile
                      </button>
                      <button className="ss-btn ss-btn-primary ss-btn-sm" onClick={() => openModal(u)}>
                        Request Swap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div className="ss-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="ss-modal" onClick={e => e.stopPropagation()}>
            <div className="ss-modal-header">
              <h2 className="ss-modal-title">Request Skill Swap</h2>
              <button className="ss-modal-close" onClick={() => setModalOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p className="ss-modal-sub">Sending request to <strong>{selectedUser.name}</strong></p>
            {successMsg ? (
              <div className="ss-alert ss-alert-success">{successMsg}</div>
            ) : (
              <>
                <div className="ss-field">
                  <label className="ss-label">Skill You're Offering</label>
                  <input className="ss-input" placeholder="e.g. React Development"
                    value={skillOffered} onChange={e => setSkillOffered(e.target.value)} />
                </div>
                <div className="ss-field">
                  <label className="ss-label">Skill You Want in Return</label>
                  <input className="ss-input" placeholder="e.g. UI/UX Design"
                    value={skillRequested} onChange={e => setSkillRequested(e.target.value)} />
                </div>
                <div className="ss-modal-actions">
                  <button className="ss-btn ss-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button className="ss-btn ss-btn-primary" onClick={handleSendRequest} disabled={sendLoading}>
                    {sendLoading ? <span className="ss-spinner" /> : "Send Request"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;