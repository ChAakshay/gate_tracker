# 🧠 GATE ECE — Week 1 Target Quest Playbook
> **Theme**: Linear Algebra (Engg. Mathematics) + Verbal Ability (General Aptitude)  
> **Target Locked**: **8 Marks** out of 100  
> **How to Use**: No clocks. No rigid schedule. Whenever you sit down to study, complete the **3 Boxes** for today's quest. Once checked, you are 100% DONE for the day.

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            WEEK 1 TARGET DASHBOARD                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ ] Day 1 : Matrices, Determinants & Rank via Row Echelon                  │
│  [ ] Day 2 : Systems of Linear Equations (Ax = b & Ax = 0 Consistency)      │
│  [ ] Day 3 : Eigenvalues, Eigenvectors & Special Matrix Properties          │
│  [ ] Day 4 : Cayley-Hamilton Theorem & Quadratic Forms                      │
│  [ ] Day 5 : Vector Spaces, Basis & Rank-Nullity Theorem + GA Verbal        │
│  [ ] Day 6 : 📝 SUBJECT TEST #1 (30 Marks CBT) + 5-Step Error Analysis      │
│  [ ] Day 7 : ☀️ Blank-Sheet Formula Dump + Red Star Rework + Mandatory Rest │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# ⚔️ DAY-BY-DAY QUEST CARDS (DAYS 1 TO 7)

---

## 🎯 DAY 1: Matrices, Determinants & Matrix Rank

### 📋 The 3 Daily Boxes:
- [ ] 🟢 **Box 1 (Theory Input ~1.5–2 hrs)**:
  * Special matrices: Symmetric ($A^T=A$), Skew-Symmetric ($A^T=-A$), Orthogonal ($A^T A = I \Rightarrow \det(A)=\pm 1$), Hermitian ($A^\theta=A$), Unitary ($A^\theta A = I$).
  * Determinant shortcut rules: $\det(cA) = c^n \det(A)$ for $n \times n$ matrix; $\det(AB) = \det(A)\det(B)$; $\det(A^{-1}) = 1/\det(A)$.
  * Matrix Rank: Number of non-zero rows in **Row Echelon Form**. Properties: $\text{Rank}(AB) \le \min(\text{Rank}(A), \text{Rank}(B))$.
- [ ] 🔵 **Box 2 (Practice Output ~1.5–2 hrs)**:
  * Solve **15 PYQs** on Matrix Determinants, Orthogonal properties, and Rank calculation (Use 4-min rule).
- [ ] 🟣 **Box 3 (Retention Lock ~30–45 min)**:
  * Draft **Short Notes Page 1**: Special Matrices table + Determinant properties + Rank rules.
  * Log any question that took $>4$ min into your **3-Line Error Log**.

> 💡 **Topper Cheat Code of the Day**:  
> Never compute a $4 \times 4$ determinant directly! Look for row/column operations ($R_i \to R_i - k R_j$) to create a row with 3 zeros, or check if any row is a linear multiple of another (if so, $\det(A) = 0$ instantly).

---

## 🎯 DAY 2: Systems of Linear Equations ($Ax = b$)

### 📋 The 3 Daily Boxes:
- [ ] 🟢 **Box 1 (Theory Input ~1.5–2 hrs)**:
  * Augmented Matrix $[A|b]$ and reduction to Row Echelon Form.
  * **Non-Homogeneous System ($Ax = b$) Consistency Rules**:
    1. $\text{Rank}(A) \neq \text{Rank}([A|b]) \implies$ **No Solution (Inconsistent)**.
    2. $\text{Rank}(A) = \text{Rank}([A|b]) = n$ (number of variables) $\implies$ **Unique Solution**.
    3. $\text{Rank}(A) = \text{Rank}([A|b]) = r < n \implies$ **Infinitely Many Solutions** (with $n-r$ linearly independent solutions).
  * **Homogeneous System ($Ax = 0$) Rules**:
    1. $\text{Rank}(A) = n \ (\det(A) \neq 0) \implies$ **Only Trivial Solution ($x=0$)**.
    2. $\text{Rank}(A) < n \ (\det(A) = 0) \implies$ **Non-Trivial (Infinite) Solutions**.
- [ ] 🔵 **Box 2 (Practice Output ~1.5–2 hrs)**:
  * Solve **15 PYQs** on finding unknown parameters (e.g., "Find $\lambda, \mu$ such that system has infinite / no solutions").
- [ ] 🟣 **Box 3 (Retention Lock ~30–45 min)**:
  * Draft **Short Notes Page 2**: The $Ax=b$ vs $Ax=0$ decision tree flowchart.
  * Log all red-star errors into your Error Log.

> 💡 **Topper Cheat Code of the Day**:  
> If an equation has 3 equations and 3 unknowns and asks for "Non-trivial solution for $Ax=0$", do **NOT** row-reduce! Just set $\det(A) = 0$ and solve for the unknown parameter in under 60 seconds.

---

## 🎯 DAY 3: Eigenvalues & Eigenvectors (Highest-Yield Topic!)

### 📋 The 3 Daily Boxes:
- [ ] 🟢 **Box 1 (Theory Input ~1.5–2 hrs)**:
  * Characteristic equation: $|A - \lambda I| = 0$.
  * **The 2 Golden Invariant Properties**:
    $$\sum \lambda_i = \text{Trace}(A) \quad (\text{Sum of diagonal elements})$$
    $$\prod \lambda_i = \det(A)$$
  * Eigenvalues of $A^k \implies \lambda^k$; Eigenvalues of $A^{-1} \implies 1/\lambda$; Eigenvalues of $A + cI \implies \lambda + c$.
  * Eigenvalues of Special Matrices:
    * Symmetric / Hermitian $\implies$ **Purely Real**.
    * Skew-Symmetric / Skew-Hermitian $\implies$ **Zero or Purely Imaginary**.
    * Orthogonal / Unitary $\implies$ **Unit Magnitude ($|\lambda| = 1$)**.
    * Triangular / Diagonal $\implies$ **Just the diagonal elements**.
  * Eigenvectors: $(A - \lambda I)X = 0$. Eigenvectors corresponding to distinct eigenvalues are **linearly independent**.
- [ ] 🔵 **Box 2 (Practice Output ~1.5–2 hrs)**:
  * Solve **20 PYQs** specifically on Eigenvalues & Eigenvectors across ECE, EE, IN, CS branches.
- [ ] 🟣 **Box 3 (Retention Lock ~30–45 min)**:
  * Draft **Short Notes Page 3**: Eigenvalue properties & special matrix shortcuts.
  * Log errors and mark questions for Day N+2 re-attempt.

> 💡 **Topper Cheat Code of the Day**:  
> For 90% of GATE eigenvalue questions, **never solve the cubic characteristic polynomial**! Use the Trace and Determinant shortcuts to eliminate 3 out of 4 options in 30 seconds:
> * *Step 1*: Check which options have sum = $\text{Trace}(A)$.
> * *Step 2*: Check which remaining option has product = $\det(A)$.

---

## 🎯 DAY 4: Cayley-Hamilton Theorem & Quadratic Forms

### 📋 The 3 Daily Boxes:
- [ ] 🟢 **Box 1 (Theory Input ~1.5–2 hrs)**:
  * **Cayley-Hamilton Theorem**: Every square matrix satisfies its own characteristic equation:
    $$\text{If } |A - \lambda I| = \lambda^n + c_{n-1}\lambda^{n-1} + \dots + c_0 = 0 \implies A^n + c_{n-1}A^{n-1} + \dots + c_0 I = 0$$
  * Using Cayley-Hamilton to find $A^{-1}$ (multiply by $A^{-1}$) and high powers $A^{100}$ (polynomial division / remainder theorem).
  * **Matrix Diagonalization**: $A = PDP^{-1}$ where $P$ is the modal matrix (matrix of eigenvectors) and $D$ is the diagonal eigenvalue matrix. $A$ is diagonalizable if and only if it has $n$ linearly independent eigenvectors.
  * **Quadratic Forms**: $Q = X^T A X$. Matrix representation of $ax^2 + 2bxy + cy^2 \implies \begin{bmatrix} a & b \\ b & c \end{bmatrix}$.
  * Definiteness via Eigenvalues:
    * Positive Definite $\implies$ All $\lambda_i > 0$ (All leading principal minors $>0$).
    * Positive Semi-Definite $\implies$ All $\lambda_i \ge 0$.
    * Negative Definite $\implies$ All $\lambda_i < 0$.
    * Indefinite $\implies$ Both positive and negative $\lambda_i$.
- [ ] 🔵 **Box 2 (Practice Output ~1.5–2 hrs)**:
  * Solve **20 PYQs** on Cayley-Hamilton matrix polynomials & Quadratic form definiteness.
- [ ] 🟣 **Box 3 (Retention Lock ~30–45 min)**:
  * Draft **Short Notes Page 4**: Cayley-Hamilton steps + Quadratic Form classification rules.
  * Log errors in your Error Log.

---

## 🎯 DAY 5: Vector Spaces, Rank-Nullity Theorem & GA Verbal

### 📋 The 3 Daily Boxes:
- [ ] 🟢 **Box 1 (Theory Input ~1.5–2 hrs)**:
  * Vector Spaces & Subspaces: Closure under addition & scalar multiplication.
  * Linear Independence: $c_1 v_1 + c_2 v_2 + \dots + c_k v_k = 0 \implies$ all $c_i = 0$. (Check if determinant of vectors $\neq 0$).
  * Basis & Dimension: Minimal spanning set. Dimension of $\mathbb{R}^n = n$.
  * **Rank-Nullity Theorem (Dimension Theorem)**:
    $$\text{Rank}(T) + \text{Nullity}(T) = n \quad (\text{Dimension of Domain / Number of Columns})$$
    $$\text{Nullity} = n - \text{Rank}(A) = \text{Dimension of Null Space / Solution Space of } Ax=0$$
  * **General Aptitude (Verbal Ability)**:
    * Subject-Verb Agreement rules (Singular subjects with "either/neither/each", collective nouns).
    * Conjunctions & Prepositions in context (Sentence completion / Error spotting).
- [ ] 🔵 **Box 2 (Practice Output ~1.5–2 hrs)**:
  * Solve **15 PYQs on Vector Spaces & Nullity** + **15 GA Verbal questions**.
- [ ] 🟣 **Box 3 (Retention Lock ~30–45 min)**:
  * Finalize your **4-Page Linear Algebra Master Binder**.
  * Prep desk for tomorrow's Saturday Subject Test.

> 💡 **Topper Cheat Code of the Day**:  
> If GATE asks: *"Find the dimension of the null space / kernel of a $4 \times 6$ matrix with rank 3"*, do **NOT** write any equations! Just apply Rank-Nullity immediately: $\text{Nullity} = \text{Columns} - \text{Rank} = 6 - 3 = 3$. Done in 5 seconds.

---

## 🏆 DAY 6 (Saturday): Subject Test #1 & 5-Step Deep Analysis

### 📋 Saturday Quest Card:
- [ ] **Box 1: Subject Test #1 (90 Minutes | Strict Exam Conditions)**:
  * Take a 30-Mark Test: **Linear Algebra (20 Marks) + GA Verbal (10 Marks)**.
  * *Rules*: Desktop/Laptop interface, no phone, no notes, virtual calculator only.
- [ ] **Box 2: 5-Step Mock Dissection (2 Hours)**:
  * **Step 1**: Calculate score & accuracy percentage (Target: $\ge 24/30$).
  * **Step 2**: Classify wrong answers:
    * *Category A*: Concept gap (didn't know how to solve).
    * *Category B*: Silly mistake (sign error, arithmetic, misread question).
    * *Category C*: Time pressure / Rush.
  * **Step 3**: Log all Category A & B errors into your **Error Log Sheet**.
  * **Step 4**: Rework every single wrong question closed-book until you get the right answer.
  * **Step 5**: Write a 1-sentence **Weekly Diagnosis** in your log (*"What is the #1 leak to fix next week?"*).
- [ ] **Box 3: Free Evening**: You completed your first week of elite preparation. Relax completely.

---

## 🛌 DAY 7 (Sunday): Active Recall Audit & Recovery

### 📋 Sunday Quest Card (Light & Restorative):
- [ ] **Box 1: Full-Week Blank-Sheet Memory Dump (45–60 min)**:
  * Close all books. Take 2 blank A4 sheets.
  * Write down **EVERY formula, condition, and property** from Linear Algebra completely from memory.
  * Open your 4 Short Notes pages side-by-side:
    * Highlight anything you forgot in **YELLOW**.
    * Circle anything you wrote incorrectly in **RED**.
    * Re-write the weak items once on the back of the page (5-min Re-encode).
- [ ] **Box 2: Error Log Pattern Review (30 min)**:
  * Re-read all Error Log entries from the week.
  * Write your **Week 1 Pattern Alert** (e.g., *"Watch out for sign errors during row operations"*).
- [ ] **Box 3: MANDATORY OFFLINE RECOVERY**:
  * No studying for the rest of the day.
  * Gym / long walk / good food / sleep. Let your brain consolidate the 85+ math problems you solved this week!

---

# 📊 Week 1 Completion Checklist

Before moving to Week 2, confirm:
- [ ] 85+ Linear Algebra & GA Verbal PYQs solved.
- [ ] 4-Page Linear Algebra Short Notes binder completed.
- [ ] Subject Test #1 taken, analyzed, and errors logged.
- [ ] Sunday Blank-Sheet Memory Dump completed.
- [ ] **8 Marks are now officially LOCKED into your GATE score!**

---
*(All files saved directly in `C:\Users\aaksh\Downloads\gate\week_1_target_quest_playbook.md`)*
