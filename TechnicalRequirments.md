## 🛠 Code Structure

### 1. `Question` (Parent Class)
- Represents a single question.  
- **Properties**:
  - `text` → question text  
  - `options` → list of possible answers  
  - `correctAnswer` → the right answer  
- **Methods**:
  - `render()` → generates HTML for the question  
  - `isCorrect(answer)` → checks if selected answer is correct  

### 2. `MultipleChoiceQuestion` (Child Class)
- Inherits from `Question`.  
- Used for multiple-choice questions.  
- **Methods**:
  - `render()` → creates radio buttons for options  

### 3. `TrueFalseQuestion` (Child Class)
- Inherits from `Question`.  
- Used for True/False questions.  
- **Methods**:
  - `render()` → creates True/False options  

### 4. `Quiz`
- Manages all questions and scoring.  
- **Properties**:
  - `questions` → list of `Question` objects  
  - `answers` → stores user-selected answers  
- **Methods**:
  - `addQuestion(question)` → adds a new question  
  - `setAnswer(questionIndex, answer)` → saves an answer  
  - `getScore()` → calculates final score  
  - `reset()` → clears answers and localStorage  

### 5. `UI`
- Handles everything related to the DOM.  
- **Methods**:
  - `renderQuiz(quiz)` → displays all questions  
  - `showResult(score, total)` → displays score + pass/fail  
  - `resetUI()` → clears UI and answers  

### 6. `Storage`
- Handles localStorage operations.  
- **Methods**:
  - `save(answers)` → saves current answers  
  - `load()` → loads saved answers  
  - `clear()` → clears saved data  

---

## ⚙️ How It Works
1. All questions are created as `MultipleChoiceQuestion` or `TrueFalseQuestion`.  
2. They are added to a `Quiz` object.  
3. `renderQuiz()` shows them on the page.  
4. When a user selects an answer, it is stored in the `Quiz` and saved to `localStorage`.  
5. **Reset button** calls `quiz.reset()` and `ui.resetUI()`.  
6. **Submit button** calls `quiz.getScore()` and shows the result.  
7. After finishing, `localStorage` is cleared for a new attempt.  

---
