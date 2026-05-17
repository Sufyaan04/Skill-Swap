import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Profile = () => {
  const { id } = useParams();
  const isOwn = !id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [name, setName] = useState("");
  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");

  useEffect(() => {
    API.get("/users/profile")
      .then(({ data }) => {
        setUser(data);
        setName(data.name);
        setOffered(data.skillsOffered?.join(", ") || "");
        setWanted(data.skillsWanted?.join(", ") || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    try {
      const { data } = await API.put("/users/profile", {
        name,
        skillsOffered: offered.split(",").map(s => s.trim()).filter(Boolean),
        skillsWanted: wanted.split(",").map(s => s.trim()).filter(Boolean),
      });
      setUser(data); setEditing(false);
      setSaveMsg("Profile updated successfully!");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch {}
  };

  const getInitials = (n) =>
    n?.split(" ").map(x => x[0]).join("").toUpperCase().slice(0, 2);

  if (loading) return <div className="ss-page ss-loading"><div className="ss-spinner ss-spinner-lg" /></div>;

  return (
    <div className="ss-page">
      <div className="ss-page-header">
        <div>
          <h1 className="ss-page-title">Profile</h1>
          <p className="ss-page-desc">Manage your public profile and skill listings</p>
        </div>
        {isOwn && !editing && (
          <button className="ss-btn ss-btn-outline" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {saveMsg && <div className="ss-alert ss-alert-success">{saveMsg}</div>}

      <div className="ss-profile-grid">
        {/* Identity */}
        <div className="ss-card ss-profile-identity">
          <div className="ss-profile-banner" />
          <div className="ss-profile-body">
            <div className="ss-profile-avatar">{getInitials(user?.name)}</div>
            {editing ? (
              <input className="ss-input ss-input-centered" value={name}
                onChange={e => setName(e.target.value)} />
            ) : (
              <>
                <h2 className="ss-profile-name">{user?.name}</h2>
                <p className="ss-profile-email">{user?.email}</p>
              </>
            )}
            <div className="ss-profile-stats">
              <div className="ss-profile-stat">
                <span className="ss-profile-stat-num">{user?.skillsOffered?.length || 0}</span>
                <span className="ss-profile-stat-label">Offering</span>
              </div>
              <div className="ss-profile-stat-sep" />
              <div className="ss-profile-stat">
                <span className="ss-profile-stat-num">{user?.skillsWanted?.length || 0}</span>
                <span className="ss-profile-stat-label">Wanted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="ss-profile-skills">
          <div className="ss-card">
            <div className="ss-card-header">
              <h3 className="ss-card-title">
                <span className="ss-dot ss-dot-green" />
                Skills I Offer
              </h3>
              <p className="ss-card-desc">What you can teach others</p>
            </div>
            <div className="ss-card-body">
              {editing ? (
                <div className="ss-field">
                  <label className="ss-label">Comma-separated skills</label>
                  <input className="ss-input" value={offered}
                    onChange={e => setOffered(e.target.value)}
                    placeholder="React, Python, Design..." />
                </div>
              ) : (
                <div className="ss-skill-tags">
                  {user?.skillsOffered?.length > 0
                    ? user.skillsOffered.map((s, i) => <span key={i} className="ss-tag-offer">{s}</span>)
                    : <span className="ss-empty-inline">No skills added yet</span>}
                </div>
              )}
            </div>
          </div>

          <div className="ss-card">
            <div className="ss-card-header">
              <h3 className="ss-card-title">
                <span className="ss-dot ss-dot-blue" />
                Skills I Want
              </h3>
              <p className="ss-card-desc">What you're looking to learn</p>
            </div>
            <div className="ss-card-body">
              {editing ? (
                <div className="ss-field">
                  <label className="ss-label">Comma-separated skills</label>
                  <input className="ss-input" value={wanted}
                    onChange={e => setWanted(e.target.value)}
                    placeholder="Guitar, Spanish, Marketing..." />
                </div>
              ) : (
                <div className="ss-skill-tags">
                  {user?.skillsWanted?.length > 0
                    ? user.skillsWanted.map((s, i) => <span key={i} className="ss-tag-want">{s}</span>)
                    : <span className="ss-empty-inline">No skills added yet</span>}
                </div>
              )}
            </div>
          </div>

          {editing && (
            <div className="ss-edit-actions">
              <button className="ss-btn ss-btn-outline" onClick={() => setEditing(false)}>Cancel</button>
              <button className="ss-btn ss-btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;