# 📝 Quiz App Assignment

## 🎯 Objective
Build a **single-page Quiz App** using **OOP principles in JavaScript** (ES6 classes).  
The app should display **all questions at once**, allow the user to **reset answers**, and show a **final score with pass/fail feedback** when submitted.  
The quiz should also use **localStorage** to persist answers during an active attempt, but start fresh after finishing.

---

## 👤 User Stories

- As a user, I want to **see all questions on the screen at once** so I can answer them in any order.  
- As a user, I want each question to show **multiple options** (multiple choice or true/false) so I can select one.  
- As a user, I want a **reset button** so I can clear all my answers and start again.  
- As a user, I want a **submit button** so I can finish the quiz.  
- As a user, I want to see my **final score out of total questions**.  
- As a user, I want to see whether I **passed or failed** (e.g., pass ≥ 70%).  
- As a user, I want my answers to be **saved temporarily** so that if I refresh the page during the quiz, my selected answers remain.  
- As a user, once I finish the quiz and refresh, I want the app to **start fresh with empty answers**.  

---

## 🔑 Acceptance Criteria
1. The quiz displays **all questions at once**.  
2. Each question allows **only one selected answer**.  
3. A **submit button** shows final score + pass/fail.  
4. A **reset button** clears all answers (in UI + localStorage).  
5. If refreshed **before finishing**, answers should be restored.  
6. If refreshed **after finishing**, a new attempt should start (no old results).  
7. Must use **OOP principles** (classes, inheritance, encapsulation, polymorphism).  

---


## ✅ Deliverables
1. A fully functional **Quiz App** in the browser.  
   - Must demonstrate **OOP in JavaScript**.  
   - Must use **DOM manipulation** to render questions and results.  
   - Must use **localStorage** for temporary persistence.  
   - Must include at least **10 questions** (mix of multiple-choice & true/false).  
   - Push the project to **GitHub** with this README file included.  
2. Diagram explaining the design of the classes and their relations (use [bpmn.io](https://bpmn.io/) or [lucidchart](https://www.lucidchart.com/pages) or just draw in a paper) and attach a screenshot for your diagram. Note that this diagram is NOT UML! 
3. Technical requirement document that translate these user stories into detailed technical items.
---

## 💯 Evaluation Criteria
| Criteria | Weight |
|----------|--------|
| Correct use of OOP (classes, inheritance, polymorphism) | 40% |
| DOM manipulation (rendering, updating, result screen)   | 25% |
| Persistence with localStorage                           | 20% |
| Code structure & readability                            | 10% |
| Extra features (styling, animations, categories, etc.)  | 5% |

---
## How to submit
Create a repository including this `README.md` file and the other **Deliverables** mentioned above. 
