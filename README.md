# 🚪 Doora Platfor

## 1. 🌍 Project Overview
Doora is a community-driven service exchange platform that connects service providers and service seekers within local communities. The platform enables secure communication, real-time service matching, and trust-based reputation building. Users can switch roles flexibly based on their needs.

---

## 2. 🏗️ Core Architecture

### 2.1 👥 System Roles
| Role | Description |
|------|-------------|
| **Service Providers** | Offer services or skills. |
| **Service Seekers** | Request support or tasks. |
| **Dual Role Support** | Users can switch roles anytime. |

### 2.2 🧰 Technology Stack
| Layer | Technologies |
|------|-------------|
| **Frontend** | React.js, TypeScript, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript, MongoDB |
| **Real-Time Communication** | Socket.io, WebRTC |
| **Authentication** | JWT tokens (secure auth) |
| **Hosting** | Vercel (Frontend), Render (Backend), MongoDB Atlas |

---

## 3. ⚙️ Functional Specifications

### 3.1 🛠️ Provider Features
#### Service Management
- Create & manage service listings
- Hashtag-based discovery filters
- Set availability and pricing

#### Opportunity Discovery
- Real-time SOS job notifications
- Location-based matching
- Countdown urgency indicator

#### Reputation System
- Metrics: jobs completed, skill usage, ratings received
- Contribution score to reflect community impact

**Verification Badges**
- ✅ Peer Verified
- 🎓 College Verified
- 🏘️ Neighborhood Verified

---

### 3.2 🔍 Seeker Features
#### Intelligent Discovery
- Providers sorted by closest distance first
- Filter by rating, price, availability
- Hashtag-driven search system

#### Urgent SOS Requests
- Time-bound urgent help posts
- Automatic post deletion after expiry
- Broadcasted to relevant providers first
- Priority-matching algorithm for emergencies

---

### 3.3 💬 Communication System
| Feature | Description |
|--------|-------------|
| Secure Chat | Real-time messaging with history |
| WebRTC Calls | Voice/Video with identity masking |
| Privacy Control | Decide when to share personal contact info |

---

## 4. 🧱 Technical Implementation

### 4.1 Core Backend Modules
```
Authentication Service
├─ User profiles and onboarding
├─ JWT session handling
└─ Secure password hashing

Service Listing Module
├─ CRUD for service listings
├─ Hashtag classification
└─ Availability & pricing

Real-time Communication
├─ Socket.io channel handling
├─ Message logging
└─ WebRTC signaling bridge

Reputation System
├─ Rating score computation
├─ Badge assignment logic
└─ Skill contribution tracking
```


### 4.2 📦 Database Schema Outlines

**User Schema**
- Role: Provider / Seeker / Both
- Location coordinates for matching
- Rating & metrics tracking
- Verification status indicators

**Service Schema**
- Title, Description, Hashtags
- Location and geo-indexing
- Availability scheduling

**SOS Schema**
- Expiry timestamp (TTL)
- Urgency level flag
- Geo-targeted broadcast filters

---

## 5. 🧠 Business Logic Overview

### Matching Algorithm Priority
1. 📍 Geographic proximity
2. ⭐ Ratings and reputation
3. 🎯 Skill tag similarity
4. 🚨 Emergency request status (if applicable)

### Trust & Safety
- Multi-step verification options
- Community reputation building
- Encrypted communication channels

### Quality & Feedback
- Real-time service review prompts
- Provider performance scoring
- Trend-based improvement analytics

---

## 6. 🚀 Deployment & Environment Setup

### 6.1 Hosting Requirements (Free-Tier Supported)
| Service | Platform |
|--------|----------|
| Database | MongoDB Atlas |
| Backend API | Render |
| Frontend App | Vercel |
| File Uploads | Cloudinary |
| Real-Time Server | Self-hosted Socket.io |

---

## 7. 📊 Success Metrics

### Platform Metrics
- Match success rate (provider-seeker conversion)
- SOS response latency
- Daily/weekly active user retention
- Active provider coverage map density

### User Satisfaction Metrics
- Provider earnings stability
- Request fulfillment completion rate
- Communication reliability score
- Community trust & rating trends

---

## 8. 📈 Future Roadmap Enhancements
- Multi-language localization
- Voice-to-Text description capture
- AI-powered smart service recommendations
- Dedicated Mobile App (Android / iOS)
- Integrated secure payments
- Community safety insurance system
- Institutional onboarding & partnerships

---

## 9. 🔐 Security & Compliance
- GDPR-compliant data handling
- Encrypted communication (in transit & at rest)
- Secure authorization & identity workflows
- Regular vulnerability audits & monitoring
