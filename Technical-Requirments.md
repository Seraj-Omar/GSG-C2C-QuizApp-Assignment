# 📝 Quiz App

## 📌 Description
This Quiz App is built with **HTML, CSS, and JavaScript (ES6 Classes)**.  
It shows multiple-choice and true/false questions on one page, lets users select answers in any order, and displays results with pass/fail feedback.  
Answers are temporarily saved in **localStorage** so that progress is not lost on refresh, but the quiz resets after finishing.

---

## 🛠 Code Structure

### 1. `StorageService`
Handles saving and loading data from **localStorage**.  
- **Methods**:
  - `save(key, value)` → saves data under a key.  
  - `load(key)` → loads data (or `null` if none).  
  - `remove(key)` → removes data.  

---

### 2. `Question` (Base Class)
Represents a single question.  
- **Properties**:
  - `id` → question id.  
  - `text` → question text.  
- **Methods**:
  - `isCorrect(choiceId)` → base method, overridden in subclasses.  

---

### 3. `MultipleChoiceQuestion` (Child of `Question`)
Used for multiple-choice questions.  
- **Properties**:
  - `choices` → array of `{ id, text }` options.  
  - `correct` → id of the correct option.  
- **Methods**:
  - `isCorrect(choiceId)` → returns true if answer matches `correct`.  

---

### 4. `TrueFalseQuestion` (Child of `Question`)
Used for true/false questions.  
- **Properties**:
  - `choices` → fixed array: `[true, false]`.  
  - `correct` → `'true'` or `'false'`.  
- **Methods**:
  - `isCorrect(choiceId)` → checks if selected matches `correct`.  

---

### 5. `QuizState`
Manages current attempt and persistence in **localStorage**.  
- **Properties**:
  - `attempt` → object `{ questionId: choiceId }`.  
  - `finished` → boolean flag for quiz completion.  
- **Methods**:
  - `load()` → loads attempt from storage (unless finished).  
  - `save()` → saves current attempt.  
  - `markFinished()` → marks quiz as finished and clears answers.  
  - `reset()` → clears state and storage.  
  - `setAnswer(id, choiceId)` → saves an answer.  
  - `getAnswer(id)` → retrieves a saved answer.  

---

### 6. `QuizRenderer`
Handles all **DOM rendering** of questions and results.  
- **Properties**:
  - `root` → container for quiz questions.  
  - `statusContainer`, `scoreEl`, `passEl` → elements for results.  
  - `retryBtn` → retry button.  
- **Methods**:
  - `renderQuestions(questions, attempt)` → displays all questions.  
  - `showResults(scoreText, passed)` → shows score and pass/fail.  
  - `hideResults()` → hides result section.  
  - `disableInputs(id)` → disables question inputs after submit.  
  - `highlightCorrect(input)` → bolds correct answers.  
  - `markIncorrect(input)` → strikes through wrong answers.  

---

### 7. `QuizManager`
Coordinates the whole app (questions, state, and UI).  
- **Properties**:
  - `questions` → array of `Question` objects.  
  - `state` → instance of `QuizState`.  
  - `renderer` → instance of `QuizRenderer`.  
  - `passThreshold` → score required to pass (70%).  
- **Methods**:
  - `attachEvents()` → attaches event listeners for answer changes, submit, reset, retry.  
  - `submit()` → calculates score, shows results, marks finished.  
  - `showAnswers()` → highlights correct and incorrect answers.  
  - `reset()` → clears state and re-renders questions.  

---

## ⚙️ Flow of the App
1. Questions are defined (`MultipleChoiceQuestion` / `TrueFalseQuestion`).  
2. `QuizManager` loads saved state (if any) and renders questions via `QuizRenderer`.  
3. When a user selects an option → answer is stored in `QuizState` and persisted with `StorageService`.  
4. On **Submit** → score is calculated, results shown, correct answers highlighted, state marked finished.  
5. On **Reset** or **Retry** → state is cleared and quiz restarts fresh.  

---

## ✅ Features
- (MCQ + True/False) Questions.  
- Save progress on refresh with localStorage.  
- Reset answers anytime.  
- Submit for results (score + pass/fail).  
- Highlight correct/incorrect answers after submit.  
- Fully OOP design with ES6 classes.  

---
