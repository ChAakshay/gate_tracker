import sys
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(15, 23, 42) # #0f172a
        self.cell(0, 8, 'GATE ECE 2027 -- WEEK 1 COMMAND CENTER', border=0, new_x='LMARGIN', new_y='NEXT')
        self.set_font('Helvetica', 'B', 8)
        self.set_text_color(37, 99, 235) # #2563eb
        self.cell(0, 4, f'PAGE {self.page_no()} OF 5', border=0, new_x='LMARGIN', new_y='NEXT')
        self.set_draw_color(37, 99, 235)
        self.set_line_width(0.5)
        self.line(10, self.get_y() + 1, 200, self.get_y() + 1)
        self.ln(3)

    def footer(self):
        self.set_y(-12)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 116, 139)
        self.cell(0, 10, 'GATE ECE 2027 Prep System | Target: IIIT Bangalore (GATE Score >= 650)', border=0, align='C')

def build_pdf():
    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.set_margins(10, 10, 10)
    pdf.set_auto_page_break(auto=True, margin=15)

    # ==================== PAGE 1 ====================
    pdf.add_page()
    
    # Target Box
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(37, 99, 235)
    pdf.set_line_width(0.4)
    pdf.rect(10, pdf.get_y(), 190, 22, style='DF')
    
    pdf.set_xy(12, pdf.get_y() + 2)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(90, 5, 'Target College: IIIT Bangalore (M.Tech ECE)')
    pdf.cell(90, 5, 'Target Score: GATE Score >= 650 | Raw Marks ~68/100', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(90, 5, 'Week 1 Focus: Engg. Math (Linear Algebra) + GA (Verbal)')
    pdf.cell(90, 5, 'Weekly Target: 85+ PYQs | 4 Short Note Pages | Subject Test #1', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(6)

    # Section Title
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, 'MON - FRI DAILY MASTER CHECKLIST (Check off daily as you complete)', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(1)

    # Table Header
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_fill_color(241, 245, 249)
    pdf.set_draw_color(203, 213, 225)
    pdf.set_text_color(15, 23, 42)
    
    col_w = [8, 25, 97, 10, 8, 8, 8, 8, 8]
    headers = ['Blk', 'Time', 'Activity / Task', 'SOP', 'M', 'T', 'W', 'T', 'F']
    
    for i, h in enumerate(headers):
        pdf.cell(col_w[i], 6, h, border=1, align='C' if i not in [1,2] else 'L', fill=True)
    pdf.ln()

    # Table Rows
    schedule_data = [
        ('0', '07:30 - 07:40', 'Red Star Re-Attempt (2 days ago RED questions closed-book)', '3.5'),
        ('0.5', '07:40 - 08:00', 'Warm-Up Memory Dump (Yesterday\'s notes blank-sheet recall)', '5'),
        ('1', '08:00 - 08:50', 'Math Theory Block 1 (Concept scan at 1.5x / book scan)', '1, 2'),
        ('2', '09:00 - 09:50', 'Math Theory Block 2 (Worked examples attack -- cover solution)', '1, 2'),
        ('3', '10:00 - 10:50', 'Math PYQ Block 1 (Topic-wise 4-min rule execution)', '1, 3'),
        ('4', '11:00 - 11:50', 'GA Verbal Block (Grammar / Logic rules & practice)', '1, 2'),
        ('5', '12:00 - 12:50', 'GA Verbal PYQs (10-12 questions, timed)', '1, 3'),
        ('---', '01:00 - 02:00', 'LUNCH + OFFLINE REST (No screens, walk 10 min)', '--'),
        ('6', '02:00 - 02:50', 'Math PYQ Block 2 (Mixed PYQ sprint -- post-lunch active focus)', '1, 3'),
        ('7', '03:00 - 03:50', 'Math PYQ Block 3 (Interleaved PYQs -- include older topics)', '1, 3'),
        ('8', '04:00 - 04:50', 'Spaced Revision (Review short notes from 3 & 7 days ago)', '5'),
        ('---', '05:00 - 05:40', 'PHYSICAL BREAK (40-min Exercise / Jog / Walk)', '--'),
        ('9', '05:40 - 06:20', 'Active Recall Drill (Blank-sheet dump + Red-Pen audit)', '5'),
        ('10', '06:30 - 07:20', 'Short Notes Synthesis (Max 1 A4 page per sub-topic)', '4'),
        ('---', '07:30 - 08:30', 'DINNER & RELAXATION', '--'),
        ('11', '08:30 - 09:00', 'Error Logging (3-line entry for every RED STAR question)', '6'),
        ('12', '09:00 - 09:10', 'Desk Setup (Bookmark tomorrow\'s links & pages, clear desk)', '--'),
        ('13', '09:10 - 09:15', 'Pre-Sleep Micro-Review (5-min slow read of Short Notes in bed)', '7.5'),
    ]

    pdf.set_font('Helvetica', '', 7.5)
    for blk, time_str, act, sop in schedule_data:
        is_break = blk == '---'
        if is_break:
            pdf.set_fill_color(241, 245, 249)
            pdf.set_font('Helvetica', 'B', 7.5)
        else:
            pdf.set_fill_color(255, 255, 255)
            pdf.set_font('Helvetica', '', 7.5)

        pdf.cell(col_w[0], 5.5, blk, border=1, align='C', fill=is_break)
        pdf.cell(col_w[1], 5.5, time_str, border=1, align='C', fill=is_break)
        pdf.cell(col_w[2], 5.5, act, border=1, align='L', fill=is_break)
        pdf.cell(col_w[3], 5.5, sop, border=1, align='C', fill=is_break)
        for i in range(5):
            pdf.cell(col_w[4+i], 5.5, '[  ]', border=1, align='C', fill=is_break)
        pdf.ln()

    # ==================== PAGE 2 ====================
    pdf.add_page()
    
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, 'DAILY METRICS & PROGRESS TRACKER', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(1)

    tracker_headers = ['Day', 'Date', 'Sub-Topics Covered', 'PYQs Done', 'Red Stars', 'Notes', 'Status']
    tr_w = [14, 12, 84, 25, 18, 17, 20]
    
    pdf.set_font('Helvetica', 'B', 7.5)
    pdf.set_fill_color(241, 245, 249)
    for i, h in enumerate(tracker_headers):
        pdf.cell(tr_w[i], 6, h, border=1, align='C' if i not in [2] else 'L', fill=True)
    pdf.ln()

    tracker_rows = [
        ('Day 1', 'Mon', 'Matrices, Determinants, Rank, Systems Ax=b consistency', '_____ / 20', '_____', '[  ] YES', 'G / Y / R'),
        ('Day 2', 'Tue', 'Eigenvalues, Eigenvectors & Special Matrix Properties', '_____ / 20', '_____', '[  ] YES', 'G / Y / R'),
        ('Day 3', 'Wed', 'Cayley-Hamilton Theorem, Matrix Powers, Quadratic Forms', '_____ / 20', '_____', '[  ] YES', 'G / Y / R'),
        ('Day 4', 'Thu', 'Vector Spaces, Subspaces, Basis, Dimension, Rank-Nullity', '_____ / 15', '_____', '[  ] YES', 'G / Y / R'),
        ('Day 5', 'Fri', 'Comprehensive PYQ Marathon (Mixed) + GA Verbal Review', '_____ / 30', '_____', '[  ] YES', 'G / Y / R'),
        ('Day 6', 'Sat', 'SUBJECT TEST #1 (30 Marks) + 5-Step Deep Analysis', 'Score: __/30', '_____', '--', 'G / Y / R'),
        ('Day 7', 'Sun', 'WEEKLY AUDIT + Full-Week Recall Dump + Mandatory Rest', '--', '--', '--', 'G / Y / R'),
    ]

    pdf.set_font('Helvetica', '', 8)
    for day, dt, top, pyq, red, nts, st in tracker_rows:
        is_wknd = day in ['Day 6', 'Day 7']
        if is_wknd:
            pdf.set_fill_color(248, 250, 252)
            pdf.set_font('Helvetica', 'B', 8)
        else:
            pdf.set_fill_color(255, 255, 255)
            pdf.set_font('Helvetica', '', 8)

        pdf.cell(tr_w[0], 6.5, day, border=1, align='C', fill=is_wknd)
        pdf.cell(tr_w[1], 6.5, dt, border=1, align='C', fill=is_wknd)
        pdf.cell(tr_w[2], 6.5, top, border=1, align='L', fill=is_wknd)
        pdf.cell(tr_w[3], 6.5, pyq, border=1, align='C', fill=is_wknd)
        pdf.cell(tr_w[4], 6.5, red, border=1, align='C', fill=is_wknd)
        pdf.cell(tr_w[5], 6.5, nts, border=1, align='C', fill=is_wknd)
        pdf.cell(tr_w[6], 6.5, st, border=1, align='C', fill=is_wknd)
        pdf.ln()

    pdf.ln(4)
    
    # Saturday Box
    pdf.set_font('Helvetica', 'B', 9.5)
    pdf.cell(0, 5, 'SATURDAY SUBJECT TEST & ANALYSIS PROTOCOL', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 8)
    pdf.set_fill_color(248, 250, 252)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(10, pdf.get_y() + 1, 190, 32, style='DF')
    pdf.set_xy(12, pdf.get_y() + 3)
    pdf.cell(0, 4.5, '[  ] 08:15 - 09:45: Subject Test #1 Execution (LA 20M + GA Verbal 10M = 30M). Strict CBT conditions.', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4.5, '[  ] 10:00 - 12:00: 5-Step Analysis Protocol Execution:', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(18)
    pdf.cell(0, 4, 'Step 1: Fill Score Table by Sub-Topic & calculate accuracy %', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(18)
    pdf.cell(0, 4, 'Step 2: Classify Errors -> Cat A (Concept) | Cat B (Silly) | Cat C (Time) | Cat D (Misread)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(18)
    pdf.cell(0, 4, 'Step 3: Write Error Log entries for Cat A & B errors', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(18)
    pdf.cell(0, 4, 'Step 4: Rework all wrong questions closed-book (Failed again = DOUBLE RED STAR)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(18)
    pdf.cell(0, 4, 'Step 5: Write single-sentence Weekly Diagnosis in Error Log', new_x='LMARGIN', new_y='NEXT')

    pdf.ln(6)

    # Sunday Box
    pdf.set_font('Helvetica', 'B', 9.5)
    pdf.cell(0, 5, 'SUNDAY AUDIT & RECOVERY CHECKLIST', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 8)
    pdf.set_fill_color(248, 250, 252)
    pdf.rect(10, pdf.get_y() + 1, 190, 24, style='DF')
    pdf.set_xy(12, pdf.get_y() + 3)
    pdf.cell(0, 4.5, '[  ] 08:00 - 09:00: Full-Week Memory Dump (Write ALL Linear Algebra properties from memory on blank A4)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4.5, '[  ] 09:00 - 10:00: Error Log Pattern Review (Re-read week\'s errors -> Write Pattern Alert)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4.5, '[  ] 10:00 - 10:30: Weekly Goal Audit (Verify 85+ PYQs, 4 Short Note pages completed)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4.5, '[  ] 10:30 - 11:00: Week 2 Setup (Bookmark Calculus & GA Quant topics, tape schedule to desk)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.set_text_color(185, 28, 28)
    pdf.set_font('Helvetica', 'B', 8)
    pdf.cell(0, 4.5, '[  ] 11:00 - 05:00: MANDATORY REST (Offline brain recovery -- NO study allowed)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_text_color(15, 23, 42)

    # ==================== PAGE 3 ====================
    pdf.add_page()

    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(0, 6, 'STANDARD OPERATING PROCEDURES (SOP) CHEAT SHEET', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(1)

    sops = [
        ('SOP 0: Energy Check', 'Green (Alert) = Full plan | Yellow (Tired) = PYQ problem solving focus | Red (Exhausted) = Emergency Protocol.'),
        ('SOP 1: Deep Work', 'Phone in other room. Single window. Timer on desk. Distraction card. 10-min break: walk, water, stretch.'),
        ('SOP 2: Theory (AM)', 'Min 0-20 Scan (1.5x, no notes) -> Min 20-40 Example Attack (cover solution) -> Min 40-50 Raw Scratch & "Can I teach it?".'),
        ('SOP 3: 3-Pass PYQ', 'Pass 1 (3 min Solo) -> Pass 2 (+1 min Short Notes) -> Pass 3 (+2 min Line 1 Hint). Pass 3 = RED STAR.'),
        ('SOP 3.5: Red Re-Attempt', 'Re-attempt RED STAR questions closed-book 2 days later at 7:30 AM. Fail = DOUBLE RED STAR.'),
        ('SOP 4: Short Notes', 'Max 1 side A4 per sub-topic. Formulas (blue) + Properties (black) + Cases (green) + TRAPS (red) + Connections (pencil).'),
        ('SOP 5: Active Recall', '15-min Blank Sheet Dump -> Audit Short Notes -> Yellow (Forgot) / Red (Wrong) -> 5-min Re-Encode.'),
        ('SOP 6: Error Log', '3 Lines for RED questions: 1. The Trap | 2. My Error (honest) | 3. The Rule for future self.'),
        ('SOP 7.5: Pre-Sleep', '5-minute slow read of today\'s Short Notes in bed. Exploits REM memory consolidation.'),
    ]

    pdf.set_font('Helvetica', '', 8)
    for title, desc in sops:
        pdf.set_fill_color(255, 255, 255)
        pdf.set_draw_color(148, 163, 184)
        pdf.rect(10, pdf.get_y(), 190, 11, style='DF')
        pdf.set_xy(12, pdf.get_y() + 1.5)
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(30, 58, 138)
        pdf.write(4, title + ': ')
        pdf.set_font('Helvetica', '', 8)
        pdf.set_text_color(15, 23, 42)
        pdf.write(4, desc)
        pdf.set_y(pdf.get_y() + 9.5)

    pdf.ln(2)

    # Contingencies Box
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(207, 19, 34)
    pdf.cell(0, 5, 'CONTINGENCY PROTOCOLS (WHEN THINGS BREAK)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_fill_color(255, 241, 240)
    pdf.set_draw_color(255, 163, 158)
    pdf.rect(10, pdf.get_y() + 1, 190, 20, style='DF')
    pdf.set_xy(12, pdf.get_y() + 2.5)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 4, '- Overslept < 1 hr: Compress breaks to 5 min, skip GA theory (do GA PYQs only).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '- Overslept 1-2 hrs: Skip Spaced Revision (4 PM). Shift Active Recall to 5:40 PM.', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '- Lost 3+ hrs: Execute Minimum Viable Day (Theory 1 + Math PYQ 1 + Short Notes + Error Log = 3.5 hrs).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '- Red Energy Day: Sleep until awake. Do 1 hr PYQs + 30 min Error Log + 15 min Short Notes (1.75 hrs total).', new_x='LMARGIN', new_y='NEXT')

    pdf.ln(5)

    # 5 Rules Box
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(212, 107, 8)
    pdf.cell(0, 5, 'THE 5 NON-NEGOTIABLE RULES', new_x='LMARGIN', new_y='NEXT')
    pdf.set_fill_color(255, 251, 230)
    pdf.set_draw_color(255, 229, 143)
    pdf.rect(10, pdf.get_y() + 1, 190, 22, style='DF')
    pdf.set_xy(12, pdf.get_y() + 2.5)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 4, '1. NEVER start a block asking "What do I do now?" (Desk prepped at 9:10 PM night before).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '2. NEVER spend >6 minutes on a single PYQ (Enforce 3-Pass Rule SOP 3).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '3. NEVER skip the 8:30 PM Error Log (Quality error analysis beats sheer volume).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '4. NEVER skip Sunday rest (Offline downtime consolidates long-term memory).', new_x='LMARGIN', new_y='NEXT')
    pdf.set_x(12)
    pdf.cell(0, 4, '5. NEVER study new theory after 4 PM (Afternoon/Evening is for practice & recall).', new_x='LMARGIN', new_y='NEXT')

    # ==================== PAGE 4 (SPACIOUS 2-ENTRY ERROR SHEET) ====================
    pdf.add_page()

    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, 'SPACIOUS ERROR LOG SHEET (2 ENTRIES PER PAGE)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', 'I', 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 4, 'Print multiple copies of this page for standard 1-Mark & 2-Mark practice mistakes.', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(3)

    def draw_spacious_entry(y_pos, entry_label):
        pdf.set_fill_color(252, 252, 253)
        pdf.set_draw_color(148, 163, 184)
        pdf.set_line_width(0.35)
        pdf.rect(10, y_pos, 190, 115, style='DF')
        
        # Header bar inside box
        pdf.set_fill_color(241, 245, 249)
        pdf.rect(10, y_pos, 190, 8, style='DF')
        pdf.set_xy(12, y_pos + 1.5)
        pdf.set_font('Helvetica', 'B', 8.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(45, 5, f'ENTRY #{entry_label}')
        pdf.cell(50, 5, 'Date: ____ / ____ / 2026')
        pdf.cell(90, 5, 'Topic: ______________________________', new_x='LMARGIN', new_y='NEXT')
        
        # Sub-header
        pdf.set_xy(12, y_pos + 9.5)
        pdf.set_font('Helvetica', '', 8)
        pdf.cell(0, 4.5, 'Source: [  ] PYQ (Year: ____ Branch: ____)    [  ] Subject Test #____     Cat: [  ] Concept (A)  [  ] Silly (B)  [  ] Time (C)', new_x='LMARGIN', new_y='NEXT')
        
        # Section 1: The Trap
        pdf.set_xy(12, y_pos + 15)
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(30, 58, 138) # Deep Blue
        pdf.cell(0, 4, '1. THE TRAP / CONCEPT TESTED (What trick or formula did the problem test?):', new_x='LMARGIN', new_y='NEXT')
        pdf.set_draw_color(203, 213, 225)
        for l in range(3):
            line_y = y_pos + 23 + (l * 5)
            pdf.line(12, line_y, 196, line_y)

        # Section 2: My Error
        pdf.set_xy(12, y_pos + 39)
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(185, 28, 28) # Red
        pdf.cell(0, 4, '2. MY EXACT ERROR & ROOT CAUSE (Why did I fail? What step went wrong?):', new_x='LMARGIN', new_y='NEXT')
        for l in range(3):
            line_y = y_pos + 47 + (l * 5)
            pdf.line(12, line_y, 196, line_y)

        # Section 3: Solution Working & Math Steps Box
        pdf.set_xy(12, y_pos + 63)
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(71, 85, 105) # Slate
        pdf.cell(0, 4, '3. CORRECT METHOD / WORKING STEPS (Key formula or matrix operation):', new_x='LMARGIN', new_y='NEXT')
        pdf.set_fill_color(255, 255, 255)
        pdf.set_draw_color(203, 213, 225)
        pdf.rect(12, y_pos + 68, 184, 22, style='DF')
        
        # Section 4: The Core Anti-Mistake Rule
        pdf.set_xy(12, y_pos + 92)
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(21, 128, 61) # Green
        pdf.cell(0, 4, '4. THE RULE FOR FUTURE SELF (One imperative sentence directive):', new_x='LMARGIN', new_y='NEXT')
        pdf.set_fill_color(240, 253, 244) # Very light green fill
        pdf.set_draw_color(187, 247, 208)
        pdf.rect(12, y_pos + 97, 184, 10, style='DF')

        # Footer Status bar inside box
        pdf.set_xy(12, y_pos + 108.5)
        pdf.set_font('Helvetica', '', 7.5)
        pdf.set_text_color(100, 116, 139)
        pdf.cell(110, 4, 'Re-Attempt Status: [  ] Day N+2 Passed (Cleared)     [  ] Day N+2 Failed (DOUBLE RED STAR)')
        pdf.cell(74, 4, 'Reviews: [  ] 1st  [  ] 2nd  [  ] 3rd', align='R')

    draw_spacious_entry(20, '_____ A')
    draw_spacious_entry(140, '_____ B')

    # ==================== PAGE 5 (FULL-PAGE DEEP ERROR SHEET) ====================
    pdf.add_page()

    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, 'DEEP ANALYSIS ERROR SHEET (FULL PAGE -- FOR COMPLEX 2-MARK / MSQs)', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', 'I', 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 4, 'Use this sheet for complex multi-step math problems, MSQs, or circuit diagrams.', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(3)

    y_pos = 20
    pdf.set_fill_color(252, 252, 253)
    pdf.set_draw_color(148, 163, 184)
    pdf.set_line_width(0.4)
    pdf.rect(10, y_pos, 190, 242, style='DF')
    
    # Header bar
    pdf.set_fill_color(241, 245, 249)
    pdf.rect(10, y_pos, 190, 10, style='DF')
    pdf.set_xy(12, y_pos + 2.5)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(45, 5, 'ENTRY # __________')
    pdf.cell(55, 5, 'Date: ____ / ____ / 2026')
    pdf.cell(85, 5, 'Topic: ______________________________', new_x='LMARGIN', new_y='NEXT')
    
    pdf.set_xy(12, y_pos + 12)
    pdf.set_font('Helvetica', '', 8)
    pdf.cell(0, 5, 'Source: [  ] PYQ (Year: ____ Branch: ____)    [  ] Subject Test # ____     Category: [  ] Concept Gap (A)   [  ] Silly Mistake (B)   [  ] Time Pressure (C)', new_x='LMARGIN', new_y='NEXT')

    # Section 1: Problem Statement & Trap
    pdf.set_xy(12, y_pos + 19)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(30, 58, 138)
    pdf.cell(0, 4, '1. THE TRAP / CONCEPT TESTED (What exact trick or multi-step condition did the problem use?):', new_x='LMARGIN', new_y='NEXT')
    pdf.set_draw_color(203, 213, 225)
    for l in range(4):
        line_y = y_pos + 28 + (l * 5.5)
        pdf.line(12, line_y, 196, line_y)

    # Section 2: Root Cause Analysis
    pdf.set_xy(12, y_pos + 52)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(185, 28, 28)
    pdf.cell(0, 4, '2. MY EXACT ERROR & ROOT CAUSE (Why did I fail? What bad assumption did I make?):', new_x='LMARGIN', new_y='NEXT')
    for l in range(4):
        line_y = y_pos + 61 + (l * 5.5)
        pdf.line(12, line_y, 196, line_y)

    # Section 3: Full Workspace (Circuit / Matrix Derivation Box)
    pdf.set_xy(12, y_pos + 85)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 4, '3. FULL SOLUTION WORKING & DIAGRAM WORKSPACE (Complete derivation):', new_x='LMARGIN', new_y='NEXT')
    pdf.set_fill_color(255, 255, 255)
    pdf.set_draw_color(203, 213, 225)
    pdf.rect(12, y_pos + 91, 184, 115, style='DF')
    
    # Grid lines inside workspace
    pdf.set_draw_color(241, 245, 249)
    for l in range(1, 19):
        pdf.line(12, y_pos + 91 + (l * 6), 196, y_pos + 91 + (l * 6))

    # Section 4: The Imperative Rule
    pdf.set_xy(12, y_pos + 209)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.set_text_color(21, 128, 61)
    pdf.cell(0, 4, '4. THE RULE FOR FUTURE SELF (One imperative sentence directive):', new_x='LMARGIN', new_y='NEXT')
    pdf.set_fill_color(240, 253, 244)
    pdf.set_draw_color(187, 247, 208)
    pdf.rect(12, y_pos + 215, 184, 14, style='DF')

    # Footer Status
    pdf.set_xy(12, y_pos + 233)
    pdf.set_font('Helvetica', '', 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(110, 4, 'Re-Attempt Status: [  ] Day N+2 Passed (Cleared)     [  ] Day N+2 Failed (DOUBLE RED STAR)')
    pdf.cell(74, 4, 'Reviews: [  ] 1st  [  ] 2nd  [  ] 3rd', align='R')

    output_path = r"C:\Users\aaksh\.gemini\antigravity\brain\61450e96-f835-4b7a-a141-102463efff9d\week_1_command_center.pdf"
    pdf.output(output_path)
    print(f"Spacious PDF successfully created at: {output_path}")

if __name__ == '__main__':
    build_pdf()
