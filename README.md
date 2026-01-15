# Sales Proposal Agent for Microsoft 365 Copilot

An enterprise-grade AI Agent designed to automate and streamline the sales proposal generation process within the Microsoft 365 ecosystem. This project demonstrates a "native" Copilot experience where an agent orchestrates workflows across Outlook, CRM (Salesforce), and Document management (SharePoint) while maintaining strict human-in-the-loop governance.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Prototype-orange)

##  Problem Statement
Sales teams often spend hours manually aggregating data from CRMs, searching for pricing policies in SharePoint, and formatting proposals in Word. This friction slows down deal cycles and increases the risk of pricing errors or non-compliance.

**The Solution:** An autonomous agent that listens for intent in Outlook, autonomously gathers context from enterprise systems, drafts a compliant proposal, and collaborates with the salesperson for refinement.

##  Key Capabilities

1.  **Context-Aware Reasoning**: The agent parses unstructured email text to identify intent (RFP), entity (Customer), and constraints (Timeline).
2.  **Multi-System Orchestration**: Explicitly visualizes connections to:
    *    **Salesforce**: For customer tier and account usage data.
    *    **SharePoint**: For up-to-date pricing policies and templates.
    *    **Governance Engine**: For discount validation and compliance checks.
3.  **Iterative Refinement (Human-in-the-Loop)**:
    *   The agent doesn't just "fire and forget." It drafts a proposal and presents it for review.
    *   Users can interactively request changes (e.g., "Reduce discount to 10%").
    *   The agent intelligently re-calculates independent variables (totals, taxes) based on these changes.
4.  **Transparent logic**: Every action includes a "Reasoning Trace" visible to the user, building trust by showing *why* a decision was made.

##  Architecture & Tech Stack

This prototype is built as a single-page application (SPA) simulating the Microsoft 365 host environment.

*   **Framework**: Next.js 15 (React)
*   **Styling**: Tailwind CSS
*   **UI Components**: Shadcn/UI (Radix Primitives) + Lucide React Icons
*   **State Management**: React Hooks (simulating Agent memory and document state)

### Data Flow Simulation
1.  **Trigger**: User receives an email in the "Outlook" view.
2.  **Analysis**: Agent extracts metadata and queries simulated endpoints.
3.  **Drafting**: Agent populates a dynamic Word template view.
4.  **Refinement**: User interacts via chat to modify state (`proposalDetails`).

##  Getting Started

### Prerequisites
*   Node.js 18+ installed

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/sales-agent-demo.git
    cd sales-agent-demo
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Demo Workflow

To experience the full agent lifecycle:

1.  **Start Context**: The app loads in "Outlook". You see an email from "Sarah Chen" requesting a proposal.
2.  **Activate Agent**: Click the **Copilot Action** button in the email header.
3.  **Observe Reasoning**: Watch the right-hand panel. The agent will show its reasoning steps (e.g., "Querying Salesforce...").
4.  **Review Draft**: When prompted, click **"Open Draft in Word"**. The view switches to the document.
5.  **Refine**: The agent will flag a 15% discount. Using the **Suggested Actions** above the chat bar, click **"Reduce discount to 10%"**.
6.  **Finalize**: Observe the table in the document update dynamically in real-time.

---

**Note**: This is a high-fidelity prototype designed for demonstration purposes. It mocks backend API calls to ensure a reliable and deterministic demo experience.
