# AYUSH Mode — Research README

## 1. Objective

The goal of this research is to define what the **AYUSH Mode** of MediKiosk should collect from a patient before consultation.

AYUSH Mode is a specialized history-taking workflow for **AYUSH/Ayurvedic patients**. It should collect the information an Ayurvedic physician needs, particularly information related to **Dashavidha Pariksha**, and present it as a structured summary for the physician.

> **Important:** AYUSH Mode is an information-gathering and summarization system. It must not independently diagnose the patient. The physician remains responsible for clinical decisions.

---

## 2. MediKiosk Context

MediKiosk is an AI-powered kiosk that conducts a patient's history-taking process before the consultation.

### Overall Flow

```text
Patient
   ↓
MediKiosk
   ↓
Patient identification + consent
   ↓
History-taking
   ↓
Document scanning
   ↓
AI structures the information
   ↓
Physician reviews summary
   ↓
Consultation
```

The project specifically proposes an **AYUSH-native history mode** capable of capturing the deeper requirements of Ayurvedic history-taking.

---

## 3. What Is AYUSH Mode?

AYUSH Mode is **not a separate application or separate kiosk**.

It is a **specialized questioning workflow inside MediKiosk**.

Conceptually:

```text
                    MediKiosk
                       │
              Patient selects / system identifies
                       │
              ┌────────┴────────┐
              ↓                 ↓
        General Mode       AYUSH Mode
              ↓                 ↓
    General clinical      Ayurvedic/AYUSH
       history              history
              │                 │
              └────────┬────────┘
                       ↓
              Structured Summary
                       ↓
                    Doctor
```

The difference is primarily in **what questions the AI asks and what information it structures**.

---

# 4. Research Focus

The research should answer:

> **What information does an Ayurvedic physician need from a patient, and how can MediKiosk collect that information through a patient-friendly conversational interface?**

The research should focus especially on **Dashavidha Pariksha**.

---

# 5. Dashavidha Pariksha Research

Research each of the ten parameters individually.

For every parameter, document:

### A. Parameter Name

What is the parameter called?

### B. Meaning

What does it represent in Ayurvedic assessment?

### C. Required Information

What information does the physician need?

### D. Patient-Answerable Information

Can the patient reasonably provide this information without a physician examination?

### E. Suggested Patient Questions

What simple questions could MediKiosk ask?

### F. Data Format

How should the answer be stored?

Examples:

* Text
* Number
* Multiple choice
* Yes/No
* Frequency
* Date
* Structured category

### G. Physician View

How should the information appear on the physician's screen?

---

# 6. Recommended Research Table

Create a table in this format:

| Parameter    | Meaning  | Information Required | Patient Question   | Data Type     | Doctor View |
| ------------ | -------- | -------------------- | ------------------ | ------------- | ----------- |
| Parameter 1  | Research | Research             | Suggested question | Text/MCQ/etc. | Summary     |
| Parameter 2  | Research | Research             | Suggested question | Text/MCQ/etc. | Summary     |
| ...          | ...      | ...                  | ...                | ...           | ...         |
| Parameter 10 | Research | Research             | Suggested question | Text/MCQ/etc. | Summary     |

Do **not** invent questions without checking their Ayurvedic relevance.

---

# 7. Important Boundary: Patient vs Physician

One of the most important parts of this research is determining:

> **What can the patient tell the kiosk, and what must remain a physician assessment?**

Divide information into:

### Patient-provided

Information that can reasonably be collected through questions.

Example categories:

* Symptoms
* Duration
* Diet
* Lifestyle
* Sleep
* Bowel habits
* Previous medical history
* Medication history
* Other patient-reported information

### Physician-assessed

Information requiring clinical expertise, observation, examination, or professional interpretation.

These should **not be falsely presented as AI-generated clinical findings**.

The research should clearly mark these boundaries.

---

# 8. Question Design

Questions should be designed for a **real hospital kiosk**, not for a medical textbook.

The target users include:

* Elderly patients
* Rural patients
* Low-literacy users
* First-time users
* Patients unfamiliar with technology

Therefore, questions should be:

* Simple
* Short
* Conversational
* Easy to answer verbally
* Available through voice + touch
* Avoid unnecessary medical terminology

Example:

Instead of:

> "Describe your gastrointestinal bowel regularity."

Prefer a patient-friendly question such as:

> "How often do you usually pass stool?"

The exact questions must be validated through the Ayurvedic research rather than assumed.

---

# 9. Adaptive Questioning

MediKiosk should not necessarily ask every patient every question.

Research how the questioning can branch based on previous answers.

Example:

```text
Patient reports stomach problem
        ↓
Ask about duration
        ↓
Ask about associated symptoms
        ↓
Ask relevant diet/lifestyle questions
        ↓
Ask relevant Ayurvedic assessment questions
        ↓
Skip irrelevant questions
        ↓
Generate structured summary
```

The objective is to make the experience **adaptive rather than a long static form**.

---

# 10. AYUSH Mode Output

The research should propose what the final physician summary should look like.

Example structure:

```text
PATIENT HISTORY — AYUSH MODE

Chief Complaint:
...

History of Present Complaint:
...

Relevant Patient Information:
...

Diet / Lifestyle:
...

Relevant Ayurvedic Parameters:
• Parameter 1: ...
• Parameter 2: ...
• Parameter 3: ...
...
• Parameter 10: ...

Previous Medical Records:
...

Medications:
...

AI Notes:
Information collected from patient.
Requires physician verification.

[EDIT] [CONFIRM]
```

The exact fields should be finalized only after research.

---

# 11. What NOT to Research

Avoid spending time on unrelated topics such as:

* Building the frontend
* Database implementation
* General AI tutorials
* Generic chatbot development
* Marketing
* Business model
* Hardware specifications

Those are handled by other members of the team.

Your job is to provide the **clinical and AYUSH knowledge required by the implementation team**.

---

# 12. Final Deliverables

At the end of the research, submit:

### Deliverable 1 — Dashavidha Pariksha Research

A clear explanation of all 10 parameters.

### Deliverable 2 — Question Bank

Patient-friendly questions that MediKiosk can ask.

### Deliverable 3 — Patient vs Physician Boundary

Clearly identify what can be collected by the kiosk and what requires physician assessment.

### Deliverable 4 — Data Structure

Define how each answer should be represented.

### Deliverable 5 — Physician Summary

Propose the structure of the final AYUSH summary.

### Deliverable 6 — Sources

Every important clinical/Ayurvedic claim should have a reliable source.

---

# 13. Research → Implementation Handoff

The most important output is not the research document itself.

It is the information that the developers can directly use.

The final handoff should look like:

```text
AYUSH Parameter
      ↓
Required Information
      ↓
Patient Can Provide? ── No → Physician Assessment
      │
     Yes
      ↓
Patient-Friendly Question
      ↓
Expected Answer Format
      ↓
Database Field
      ↓
Physician Summary Field
```

This makes the research directly useful for implementation.

---

# 14. Success Criteria

The research is complete when the implementation team can answer:

> **"If we want to build AYUSH Mode tomorrow, exactly what questions should the AI ask, what answers should it collect, what should it store, and what should the doctor see?"**

If the research cannot answer these questions, it is not yet implementation-ready.

---

## Core Goal

**Don't research AYUSH just to explain AYUSH.**

Research AYUSH so that you can convert **Ayurvedic clinical requirements → patient-friendly questions → structured data → physician-ready summary**.

That is the actual purpose of the AYUSH Mode research in MediKiosk.
