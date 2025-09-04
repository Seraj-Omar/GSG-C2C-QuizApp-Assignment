class StorageService {
    save(key, value) { 
        localStorage.setItem(key, JSON.stringify(value)); 
    }
    load(key) { 
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    remove(key) { localStorage.removeItem(key); }
}

class Question {
  constructor(id, text) { this.id = id; this.text = text; }
  isCorrect(choiceId) { return false; }
}

class MultipleChoiceQuestion extends Question {
  constructor(id, text, choices, correct) {
    super(id, text);
    this.choices = choices;
    this.correct = correct;
  }
  isCorrect(choiceId) { return choiceId === this.correct; }
}

class TrueFalseQuestion extends Question {
  constructor(id, text, correct) {
    super(id, text);
    this.choices = [{ id:'true', text:'True' }, { id:'false', text:'False' }];
    this.correct = correct ? 'true' : 'false';
  }
  isCorrect(choiceId) { return choiceId === this.correct; }
}

class QuizState {
    constructor(storageKey='quiz_attempt', finishedKey='quiz_finished') {
        this.storage = new StorageService();
        this.storageKey = storageKey;
        this.finishedKey = finishedKey;
        this.attempt = {};
        this.finished = false;
    }

    load() {
        if (this.storage.load(this.finishedKey)) { 
            this.reset(); 
            return; 
        }
        const data = this.storage.load(this.storageKey);
        if (data) 
            this.attempt = data;
    }

    save() { 
        if (!this.finished)
            this.storage.save(this.storageKey, this.attempt); 
    }
    markFinished() { 
        this.finished = true; 
        this.storage.save(this.finishedKey, true); 
        this.storage.remove(this.storageKey); 
    }
    reset() { 
        this.attempt = {}; 
        this.finished = false; 
        this.storage.remove(this.storageKey); 
        this.storage.remove(this.finishedKey); 
    }
    setAnswer(id, choiceId) { 
        this.attempt[id] = choiceId; 
        this.save(); 
    }
    getAnswer(id) {
        return this.attempt[id]; 
    }
}

class QuizRenderer {
    constructor(rootId='quiz-main', statusId='status-container') {
        this.root = document.getElementById(rootId);
        this.statusContainer = document.getElementById(statusId);
        this.scoreEl = document.getElementById('score');
        this.passEl = document.getElementById('pass');
        this.retryBtn = document.getElementById('retryBtn');
    }

    renderQuestions(questions, attempt) {
        this.root.innerHTML = '';
        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<strong>Q${q.id}:</strong> ${q.text}`;
            q.choices.forEach(ch => {
                const label = document.createElement('label');
                label.className = 'choice';
                label.innerHTML = `<input type="radio" name="q_${q.id}" value="${ch.id}" ${attempt[q.id]===ch.id?'checked':''}> ${ch.text}`;
                card.appendChild(label);
            });
            this.root.appendChild(card);
        });
    }

    showResults(scoreText, passed) {
        this.scoreEl.textContent = scoreText;
        this.passEl.textContent = passed ? 'Result: Passed 🎉' : 'Result: Failed — try again';
        this.statusContainer.style.display = 'flex';
        this.retryBtn.style.display = 'inline-block';
    }

    hideResults() { 
        this.statusContainer.style.display = 'none'; 
        this.retryBtn.style.display = 'none'; 
    }

    disableInputs(id) {
        document.getElementsByName(`q_${id}`).forEach(inp => inp.disabled = true);
    }

    highlightCorrect(input) { 
        input.parentElement.style.fontWeight = 'bold'; 
    }
    markIncorrect(input) { 
        input.parentElement.style.textDecoration = 'line-through'; 
    }
}

class QuizManager {
    constructor(questions) {
        this.questions = questions;
        this.state = new QuizState();
        this.renderer = new QuizRenderer();
        this.passThreshold = 0.7;

        this.state.load();
        this.renderer.renderQuestions(this.questions, this.state.attempt);
        this.attachEvents();
    }

    attachEvents() {
        this.renderer.root.addEventListener('change', e => {
            const target = e.target;
            if (target.name && target.name.startsWith('q_')) {
                const id = target.name.split('_')[1];
                this.state.setAnswer(id, target.value);
            }
        });
        document.getElementById('submitBtn').addEventListener('click', ()=> this.submit());
        document.getElementById('resetBtn').addEventListener('click', ()=> this.reset());
        this.renderer.retryBtn.addEventListener('click', ()=> this.reset());
    }

    submit() {
        let correct = 0;
        this.questions.forEach(q => { if (q.isCorrect(this.state.getAnswer(q.id))) correct++; });

        const percent = correct / this.questions.length;
        const passed = percent >= this.passThreshold;
        this.renderer.showResults(`Score: ${correct} / ${this.questions.length} (${Math.round(percent*100)}%)`, passed);

        this.showAnswers();
        this.state.markFinished();
    }

    showAnswers() {
        this.questions.forEach(q => {
            const inputs = document.getElementsByName(`q_${q.id}`);
            inputs.forEach(input => {
                this.renderer.disableinpututs(q.id);
                if (q.isCorrect(input.value)) 
                    this.renderer.highlightCorrect(input);
                if (input.checked && !q.isCorrect(input.value)) 
                    this.renderer.markIncorrect(input);
            });
        });
    }

  reset() {
    this.state.reset();
    this.renderer.hideResults();
    this.renderer.renderQuestions(this.questions, this.state.attempt);
  }
}

const questions = [
  new MultipleChoiceQuestion(1, 'Which language runs in a web browser?', [{id:'a',text:'Java'},{id:'b',text:'C++'},{id:'c',text:'JavaScript'},{id:'d',text:'Python'}], 'c'),
  new MultipleChoiceQuestion(2, 'Which language is the best for Problem Solving?', [{id:'a',text:'Java'},{id:'b',text:'C++'},{id:'c',text:'JavaScript'},{id:'d',text:'Python'}],'b'),
  new TrueFalseQuestion(3, 'CSS stands for Cascading Style Sheets.', true),
  new MultipleChoiceQuestion(4, 'Which Data Structure is the best for range query with point updates?', [{id:'a',text:'SegmnetTree'},{id:'b',text:'SparseTable'},{id:'c',text:'Lazy SegmentTree'},{id:'d',text:'MergeTree'}],'a'),
  new MultipleChoiceQuestion(5, 'Which Shortest Path algorithm can give us the shortest path from a source node with negative edges weights?', [{id:'a',text:'BellmanFord'},{id:'b',text:'FloyedWarshell'},{id:'c',text:'Dijkstra'},{id:'d',text:'Bfs'}],'a'),
];

const quiz = new QuizManager(questions);
