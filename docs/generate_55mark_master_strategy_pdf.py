import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running Top Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(28, A4[1] - 20, "GATE 2027 ECE — 55-MARK RELIABILITY ENGINE & MASTER BLUEPRINT")
            self.drawRightString(A4[0] - 28, A4[1] - 20, "IIT MADRAS EXECUTION MODEL")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(28, A4[1] - 24, A4[0] - 28, A4[1] - 24)

        # Running Footer (All Pages)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.setFont("Helvetica-Bold", 8)
        self.drawRightString(A4[0] - 28, 16, page_text)
        self.setFont("Helvetica", 7.5)
        self.drawString(28, 16, "STRICTLY OBJECTIVE-DRIVEN | Target: 55+ Raw Marks (P >= 85-90%) | IIIT-B Admission Engine")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        self.line(28, 24, A4[0] - 28, 24)
        self.restoreState()

def build_pdf(filename="GATE_2027_ECE_55Mark_Master_Strategy.pdf"):
    # Usable width = 595.27 - 56 = 539.27 pt
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=28,
        rightMargin=28,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Executive Color Palette
    c_primary = colors.HexColor("#0F172A")    # Slate 900
    c_secondary = colors.HexColor("#1E293B")  # Slate 800
    c_accent = colors.HexColor("#2563EB")     # Blue 600
    c_emerald = colors.HexColor("#059669")    # Emerald 600
    c_emerald_bg = colors.HexColor("#ECFDF5")
    c_amber = colors.HexColor("#D97706")      # Amber 600
    c_amber_bg = colors.HexColor("#FFFBEB")
    c_rose = colors.HexColor("#DC2626")       # Rose 600
    c_rose_bg = colors.HexColor("#FEF2F2")
    c_border = colors.HexColor("#CBD5E1")     # Slate 300
    c_alt_row = colors.HexColor("#F8FAFC")    # Slate 50
    c_muted = colors.HexColor("#64748B")      # Slate 500

    # Typography Styles
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=c_primary,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.6,
        leading=10.4,
        textColor=colors.HexColor("#334155")
    )
    body_bold = ParagraphStyle(
        'Body_Bold_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.6,
        leading=10.4,
        textColor=c_secondary
    )
    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.4,
        leading=10.0,
        textColor=c_secondary
    )
    tbl_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.8,
        leading=8.6,
        textColor=c_secondary
    )
    tbl_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.6,
        textColor=c_primary
    )
    tbl_cell_center = ParagraphStyle(
        'TableCellCenter',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.8,
        leading=8.6,
        textColor=c_secondary,
        alignment=1
    )
    tbl_cell_center_bold = ParagraphStyle(
        'TableCellCenterBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.6,
        textColor=c_primary,
        alignment=1
    )
    tbl_hdr = ParagraphStyle(
        'TableHdr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.6,
        textColor=colors.white
    )
    tbl_hdr_center = ParagraphStyle(
        'TableHdrCenter',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.6,
        textColor=colors.white,
        alignment=1
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER & EXECUTIVE PORTFOLIO ARCHITECTURE
    # =========================================================================
    hero_data = [
        [
            Paragraph("MASTER PREPARATION ARCHITECTURE — GATE 2027 ECE", ParagraphStyle('HeroPre', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.HexColor("#93C5FD"))),
            Paragraph("ORGANIZING: IIT MADRAS", ParagraphStyle('HeroPreRight', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.HexColor("#93C5FD"), alignment=2))
        ],
        [
            Paragraph("The 55-Mark Reliability Engine (Performance-Grounded Blueprint)", ParagraphStyle('HeroMain', fontName='Helvetica-Bold', fontSize=14, leading=17, textColor=colors.white)),
            ""
        ],
        [
            Paragraph("Replacing theoretical syllabus coverage with an Expected Marks × P(Solve Correctly) ÷ Preparation Time model. Engineered to guarantee 55+ Raw Marks with 85–90% mock-verified confidence.", ParagraphStyle('HeroDesc', fontName='Helvetica', fontSize=7.6, leading=10.5, textColor=colors.HexColor("#CBD5E1"))),
            ""
        ]
    ]
    hero_table = Table(hero_data, colWidths=[390, 149])
    hero_table.setStyle(TableStyle([
        ('SPAN', (0, 1), (1, 1)),
        ('SPAN', (0, 2), (1, 2)),
        ('BACKGROUND', (0, 0), (-1, -1), c_primary),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 1),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 2),
        ('BOTTOMPADDING', (0, 2), (-1, 2), 6),
    ]))
    story.append(hero_table)
    story.append(Spacer(1, 5))

    # KPI Summary Cards (4 Columns)
    kpi_data = [
        [
            Paragraph("PRIMARY OBJECTIVE", ParagraphStyle('kpi_lbl', fontName='Helvetica-Bold', fontSize=6.2, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("MOCK BUFFER CAPACITY", ParagraphStyle('kpi_lbl', fontName='Helvetica-Bold', fontSize=6.2, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("TARGET CONFIDENCE", ParagraphStyle('kpi_lbl', fontName='Helvetica-Bold', fontSize=6.2, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("PORTFOLIO ARCHITECTURE", ParagraphStyle('kpi_lbl', fontName='Helvetica-Bold', fontSize=6.2, leading=7.5, textColor=c_muted, alignment=1)),
        ],
        [
            Paragraph("55+ Raw Marks", ParagraphStyle('kpi_val', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=c_accent, alignment=1)),
            Paragraph("60 – 65+ Marks", ParagraphStyle('kpi_val', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=c_emerald, alignment=1)),
            Paragraph("85 – 90%", ParagraphStyle('kpi_val', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=c_primary, alignment=1)),
            Paragraph("3 Robust Layers", ParagraphStyle('kpi_val', fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=c_amber, alignment=1)),
        ],
        [
            Paragraph("IIIT-B M.Tech ECE Guaranteed", ParagraphStyle('kpi_sub', fontName='Helvetica', fontSize=6.0, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("Insulates against hostile papers", ParagraphStyle('kpi_sub', fontName='Helvetica', fontSize=6.0, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("Performance-based (Not syllabus %)", ParagraphStyle('kpi_sub', fontName='Helvetica', fontSize=6.0, leading=7.5, textColor=c_muted, alignment=1)),
            Paragraph("Layer A (Core) + B (Buffer) + C (Pick)", ParagraphStyle('kpi_sub', fontName='Helvetica', fontSize=6.0, leading=7.5, textColor=c_muted, alignment=1)),
        ]
    ]
    kpi_table = Table(kpi_data, colWidths=[134.75]*4)
    kpi_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, 0), 4),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 4),
    ]))
    story.append(kpi_table)
    story.append(Spacer(1, 6))

    story.append(Paragraph("1. Core Philosophy: The Expected Marks & Reliability Formula", h1_style))
    story.append(Paragraph(
        "A naive strategy optimizes for theoretical syllabus weightage. In reality, a candidate's actual exam score is governed by a stochastic conversion chain. "
        "Every topic in this blueprint is prioritized strictly by its <b>Marks-Per-Hour Efficiency</b> and <b>Conversion Reliability</b>:",
        body_style
    ))
    story.append(Spacer(1, 3))

    engine_box = [
        [
            Paragraph("<b>THE CONVERSION & RETURN ON TIME EQUATIONS:</b><br/>"
                      "<code>EXPECTED MARKS = [Opportunity × P(Appear) × P(Recognize) × P(Solve Correctly)] − Expected Negative Leakage</code><br/>"
                      "<code>MARKS PER PREPARATION HOUR = Expected Incremental Marks / Actual Study Hours Required to reach 85% Accuracy</code><br/>"
                      "• <b>Layer A (Bankable Core, ~42 Marks):</b> 85–95% accuracy target. Highly algorithmic, template-invariant, near-zero negative leakage.<br/>"
                      "• <b>Layer B (Defensive Buffer, ~22 Marks):</b> 60–80% accuracy target. Protects against hostile question distributions and difficult Layer A sets.<br/>"
                      "• <b>Layer C (Selective / Survival, ~12 Marks):</b> 40–50% accuracy target. Low-effort formulas for cheap unexpected 1-mark pickups.",
                      callout_style)
        ]
    ]
    engine_tbl = Table(engine_box, colWidths=[539])
    engine_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor("#93C5FD")),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(engine_tbl)
    story.append(Spacer(1, 6))

    story.append(Paragraph("2. Stress-Testing the 55-Mark Portfolio Across 3 Scenarios", h1_style))
    story.append(Paragraph(
        "A preparation plan is invalid if it only works on an average paper. The 55-Mark Reliability Engine is evaluated across three stress scenarios:",
        body_style
    ))
    story.append(Spacer(1, 3))

    scenarios_data = [
        [
            Paragraph("<b>Scenario Parameter</b>", tbl_hdr),
            Paragraph("<b>Scenario 1: Favorable Paper</b>", tbl_hdr_center),
            Paragraph("<b>Scenario 2: Normal / Median Paper</b>", tbl_hdr_center),
            Paragraph("<b>Scenario 3: Hostile / Deviant Paper</b>", tbl_hdr_center)
        ],
        [
            Paragraph("<b>Paper Characteristics</b>", tbl_cell_bold),
            Paragraph("Standard templates; high GA/Math overlap; familiar circuits in Analog/EDC.", tbl_cell),
            Paragraph("Balanced difficulty; 2–3 tricky NATs; moderate math; standard Transients & Digital.", tbl_cell),
            Paragraph("High MSQ count (15+); novel circuit configurations; unusual topic weight distribution.", tbl_cell)
        ],
        [
            Paragraph("<b>Layer A Conversion (Core 44M)</b>", tbl_cell_bold),
            Paragraph("92% yield = <b>40.5 Marks</b>", tbl_cell_center),
            Paragraph("86% yield = <b>37.8 Marks</b>", tbl_cell_center),
            Paragraph("75% yield = <b>33.0 Marks</b>", tbl_cell_center)
        ],
        [
            Paragraph("<b>Layer B Conversion (Buffer 22M)</b>", tbl_cell_bold),
            Paragraph("78% yield = <b>17.2 Marks</b>", tbl_cell_center),
            Paragraph("68% yield = <b>15.0 Marks</b>", tbl_cell_center),
            Paragraph("55% yield = <b>12.1 Marks</b>", tbl_cell_center)
        ],
        [
            Paragraph("<b>Layer C Pickups (Survival 12M)</b>", tbl_cell_bold),
            Paragraph("50% yield = <b>6.0 Marks</b>", tbl_cell_center),
            Paragraph("35% yield = <b>4.2 Marks</b>", tbl_cell_center),
            Paragraph("20% yield = <b>2.4 Marks</b>", tbl_cell_center)
        ],
        [
            Paragraph("<b>Negative Marking Deduction</b>", tbl_cell_bold),
            Paragraph("−1.8 Marks", tbl_cell_center),
            Paragraph("−2.6 Marks", tbl_cell_center),
            Paragraph("−4.2 Marks", tbl_cell_center)
        ],
        [
            Paragraph("<b>NET RAW SCORE OUTCOME</b>", tbl_cell_bold),
            Paragraph("<b><font color='#059669'>61.9 – 64.0 MARKS</font></b><br/>(Top 150 AIR / Old IIT Admit)", ParagraphStyle('s1', parent=tbl_cell_center_bold, textColor=c_emerald)),
            Paragraph("<b><font color='#2563EB'>54.4 – 56.5 MARKS</font></b><br/>(55 TARGET SECURED / IIIT-B)", ParagraphStyle('s2', parent=tbl_cell_center_bold, textColor=c_accent)),
            Paragraph("<b><font color='#D97706'>48.5 – 51.5 MARKS</font></b><br/>(Still within List 2/3 Cutoff)", ParagraphStyle('s3', parent=tbl_cell_center_bold, textColor=c_amber))
        ]
    ]
    scenarios_tbl = Table(scenarios_data, colWidths=[129, 135, 135, 140])
    scenarios_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, c_alt_row]),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#EFF6FF")),
    ]))
    story.append(scenarios_tbl)
    story.append(Spacer(1, 6))

    story.append(Paragraph("3. General Aptitude & Mathematics: The Core Reliability Firewall", h1_style))
    story.append(Paragraph(
        "GA (15 Marks) and Engineering Math (13 Marks) account for 28% of the total paper. Below is the exact technical marks contingency required across different GA+Math score realizations:",
        body_style
    ))
    story.append(Spacer(1, 3))

    contingency_data = [
        [
            Paragraph("<b>GA Realized</b>", tbl_hdr_center),
            Paragraph("<b>Math Realized</b>", tbl_hdr_center),
            Paragraph("<b>Combined GA+Math</b>", tbl_hdr_center),
            Paragraph("<b>Technical Marks Needed (for 55)</b>", tbl_hdr_center),
            Paragraph("<b>Technical Efficiency Required (out of 72M)</b>", tbl_hdr_center),
            Paragraph("<b>Strategic Feasibility</b>", tbl_hdr_center)
        ],
        [
            Paragraph("13.0 Marks", tbl_cell_center), Paragraph("11.0 Marks", tbl_cell_center),
            Paragraph("<b>24.0 Marks</b>", tbl_cell_center_bold), Paragraph("<b>31.0 Marks</b>", tbl_cell_center_bold),
            Paragraph("43.0% conversion", tbl_cell_center), Paragraph("<font color='#059669'>Extremely Easy (Near 100% Lock)</font>", tbl_cell_center)
        ],
        [
            Paragraph("12.0 Marks", tbl_cell_center), Paragraph("10.0 Marks", tbl_cell_center),
            Paragraph("<b>22.0 Marks</b>", tbl_cell_center_bold), Paragraph("<b>33.0 Marks</b>", tbl_cell_center_bold),
            Paragraph("45.8% conversion", tbl_cell_center), Paragraph("<font color='#059669'>Standard Benchmark Target</font>", tbl_cell_center)
        ],
        [
            Paragraph("11.0 Marks", tbl_cell_center), Paragraph("9.0 Marks", tbl_cell_center),
            Paragraph("<b>20.0 Marks</b>", tbl_cell_center_bold), Paragraph("<b>35.0 Marks</b>", tbl_cell_center_bold),
            Paragraph("48.6% conversion", tbl_cell_center), Paragraph("<font color='#2563EB'>Comfortable (Standard Preparation)</font>", tbl_cell_center)
        ],
        [
            Paragraph("10.0 Marks", tbl_cell_center), Paragraph("8.0 Marks", tbl_cell_center),
            Paragraph("<b>18.0 Marks</b>", tbl_cell_center_bold), Paragraph("<b>37.0 Marks</b>", tbl_cell_center_bold),
            Paragraph("51.4% conversion", tbl_cell_center), Paragraph("<font color='#D97706'>Demands strong Layer B buffer</font>", tbl_cell_center)
        ],
        [
            Paragraph("9.0 Marks", tbl_cell_center), Paragraph("7.0 Marks", tbl_cell_center),
            Paragraph("<b>16.0 Marks</b>", tbl_cell_center_bold), Paragraph("<b>39.0 Marks</b>", tbl_cell_center_bold),
            Paragraph("54.2% conversion", tbl_cell_center), Paragraph("<font color='#DC2626'>High Stress on Technical Core</font>", tbl_cell_center)
        ]
    ]
    contingency_tbl = Table(contingency_data, colWidths=[70, 75, 90, 110, 100, 94])
    contingency_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_secondary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(contingency_tbl)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: COMPLETE 55-MARK PRIORITY RANKING TABLE (COMPACT & COMPLETE)
    # =========================================================================
    story.append(Paragraph("4. Complete Topic Ranking: Expected Marks, Effort & Marks/Hour", h1_style))
    story.append(Paragraph(
        "Ranked strictly by <b>Marks-Per-Hour Efficiency</b>, <b>Target Accuracy</b>, <b>Mastery Level</b>, and <b>Drop Risk</b>. "
        "P0 = Non-negotiable Bankable Core | P1 = High-Yield Buffer | P2 = Secondary Buffer | P3 = Survival Coverage | P4 = De-prioritized.",
        body_style
    ))
    story.append(Spacer(1, 4))

    topic_rank_header = [
        Paragraph("<b>P#</b>", tbl_hdr_center),
        Paragraph("<b>Subject & Topic Domain</b>", tbl_hdr),
        Paragraph("<b>Hist.</b>", tbl_hdr_center),
        Paragraph("<b>Exp.</b>", tbl_hdr_center),
        Paragraph("<b>Hrs</b>", tbl_hdr_center),
        Paragraph("<b>M/Hr</b>", tbl_hdr_center),
        Paragraph("<b>Acc.</b>", tbl_hdr_center),
        Paragraph("<b>Lvl</b>", tbl_hdr_center),
        Paragraph("<b>Drop Risk</b>", tbl_hdr_center),
        Paragraph("<b>Portfolio Layer</b>", tbl_hdr)
    ]

    ranked_topics = [
        ("P0", "GA: Quant Aptitude (Ratios, Speed, Work, %)", 5.0, 4.2, 8, "0.53", "90%", "L2", "FATAL", "Layer A (Bankable)"),
        ("P0", "GA: Spatial Aptitude (2D/3D Folding & Rotation)", 3.0, 2.6, 5, "0.52", "90%", "L2", "FATAL", "Layer A (Bankable)"),
        ("P0", "Math: Linear Algebra (Eigen, Rank, Systems AX=B)", 5.0, 4.4, 12, "0.37", "90%", "L2/L3", "FATAL", "Layer A (Bankable)"),
        ("P0", "Digital: K-Maps & Logic Minimization", 2.0, 1.8, 5, "0.36", "95%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Digital: Combinational Logic & Multiplexers", 3.0, 2.7, 8, "0.34", "92%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Networks: KCL/KVL & Equivalent Theorems", 3.0, 2.6, 8, "0.33", "90%", "L2/L3", "FATAL", "Layer A (Bankable)"),
        ("P0", "Analog: Op-Amp Circuits & Schmitt Triggers", 4.5, 3.8, 12, "0.32", "88%", "L2/L3", "FATAL", "Layer A (Bankable)"),
        ("P0", "Digital: Setup & Hold Timing Slack Analysis", 2.0, 1.8, 6, "0.30", "90%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Networks: Transient Analysis (1st & 2nd Order)", 3.5, 2.9, 10, "0.29", "85%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Control: Bode Plots & Gain/Phase Margins", 2.5, 2.1, 8, "0.26", "88%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Control: Second-Order Time Response Specifications", 2.5, 2.1, 8, "0.26", "88%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Signals: LTI Convolution (Continuous & Discrete)", 2.5, 2.1, 8, "0.26", "88%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Signals: Laplace & Z-Transform ROC Analysis", 4.0, 3.3, 13, "0.25", "85%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "EDC: MOSFET Physics (MOS-C, C-V Curve, Vth)", 3.5, 2.8, 12, "0.23", "82%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "EMTL: Transmission Lines (Γ, VSWR, Zin, Match)", 4.0, 3.2, 14, "0.23", "82%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Math: Calculus & Vector Integral Theorems", 4.5, 3.6, 16, "0.23", "82%", "L2", "HIGH", "Layer A (Bankable)"),
        ("P0", "Math: 1st-Order DEs & Cauchy-Euler Homogeneous", 2.0, 1.6, 7, "0.23", "85%", "L2", "MEDIUM", "Layer A (Bankable)"),
        ("P1", "GA: Verbal Reasoning & Comprehension", 4.5, 3.4, 10, "0.34", "80%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P1", "Signals: Sampling Theorem & Reconstruction", 1.5, 1.3, 5, "0.26", "88%", "L1/L2", "LOW", "Layer B (Buffer)"),
        ("P1", "Control: Routh-Hurwitz Stability Criterion", 1.8, 1.5, 6, "0.25", "85%", "L2", "LOW", "Layer B (Buffer)"),
        ("P1", "Digital: Sequential Circuits & Mod-N Counters", 2.5, 2.0, 8, "0.25", "82%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P1", "EDC: PN Junction Diode Built-in Vbi & Cj", 2.5, 1.9, 8, "0.24", "80%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P1", "Analog: Diode Circuits (Clippers/Clampers/Zener)", 2.0, 1.6, 7, "0.23", "82%", "L2", "LOW", "Layer B (Buffer)"),
        ("P1", "Comm: PCM & Quantization SNRq Calculation", 2.0, 1.6, 7, "0.23", "82%", "L2", "LOW", "Layer B (Buffer)"),
        ("P1", "Comm: Random Processes (WSS, Autocorr, PSD)", 3.5, 2.5, 12, "0.21", "75%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P1", "Comm: Information Theory (Entropy & Shannon)", 1.8, 1.5, 7, "0.21", "82%", "L2", "LOW", "Layer B (Buffer)"),
        ("P1", "Math: Probability & Bayes Theorem", 2.5, 1.9, 10, "0.19", "78%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P2", "Comm: Digital Modulation (BER BPSK/QPSK)", 3.0, 2.0, 12, "0.17", "70%", "L2", "LOW", "Layer B (Buffer)"),
        ("P2", "Analog: BJT/MOSFET DC Biasing & Single Stage", 2.5, 1.8, 10, "0.18", "72%", "L2", "MEDIUM", "Layer B (Buffer)"),
        ("P2", "Networks: AC Resonance & Two-Port Parameters", 2.5, 1.8, 10, "0.18", "75%", "L1/L2", "LOW", "Layer B (Buffer)"),
        ("P2", "EMTL: Uniform Plane Waves & Polarization", 2.0, 1.5, 9, "0.17", "75%", "L1/L2", "LOW", "Layer B (Buffer)"),
        ("P2", "Math: Complex Residue Theorem & Correlation", 2.5, 1.7, 9, "0.19", "75%", "L1/L2", "LOW", "Layer B (Buffer)"),
        ("P3", "EMTL: Boundary Conditions & Waveguide Cutoff", 2.0, 1.2, 5, "0.24", "65%", "L1", "NEGLIGIBLE", "Layer C (Survival)"),
        ("P3", "EDC: Carrier Transport & Bandgap Concepts", 2.0, 1.2, 6, "0.20", "65%", "L1", "NEGLIGIBLE", "Layer C (Survival)"),
        ("P3", "Control: State Space STM & PID Controllers", 2.5, 1.5, 8, "0.19", "65%", "L1", "NEGLIGIBLE", "Layer C (Survival)"),
        ("P4", "EMTL: Electrostatics, Magnetostatics, Antennas", 4.5, 0.9, 25, "0.04", "30%", "L0", "NEGLIGIBLE", "Layer C (Dropped)"),
        ("P4", "Comm: Superheterodyne & Convolutional Codes", 2.5, 0.4, 16, "0.03", "25%", "L0", "NEGLIGIBLE", "Layer C (Dropped)"),
        ("P4", "Analog: Multi-Stage High-Freq Cascode Response", 1.8, 0.3, 15, "0.02", "25%", "L0", "NEGLIGIBLE", "Layer C (Dropped)"),
        ("P4", "Math: Multi-dimensional PDEs & Infinite Series", 1.2, 0.2, 12, "0.02", "20%", "L0", "NEGLIGIBLE", "Layer C (Dropped)"),
    ]

    t_ranked_rows = [topic_rank_header]
    for r in ranked_topics:
        p_color = c_emerald if r[0] == 'P0' else (c_accent if r[0] == 'P1' else (c_amber if r[0] == 'P2' else (colors.HexColor("#7C3AED") if r[0] == 'P3' else c_rose)))
        risk_color = c_rose if r[8] == 'FATAL' else (c_amber if r[8] == 'HIGH' else (c_muted if r[8] == 'MEDIUM' else colors.HexColor("#94A3B8")))
        
        row = [
            Paragraph(f"<b><font color='{p_color}'>{r[0]}</font></b>", tbl_cell_center_bold),
            Paragraph(r[1], tbl_cell),
            Paragraph(str(r[2]), tbl_cell_center),
            Paragraph(f"<b>{r[3]}</b>", tbl_cell_center_bold),
            Paragraph(str(r[4]), tbl_cell_center),
            Paragraph(f"<b>{r[5]}</b>", tbl_cell_center_bold),
            Paragraph(r[6], tbl_cell_center),
            Paragraph(r[7], tbl_cell_center),
            Paragraph(f"<b><font color='{risk_color}'>{r[8]}</font></b>", tbl_cell_center),
            Paragraph(r[9], tbl_cell)
        ]
        t_ranked_rows.append(row)

    col_w_rank = [22, 168, 32, 34, 28, 34, 38, 28, 54, 101]
    tbl_ranked = Table(t_ranked_rows, colWidths=col_w_rank)
    tbl_ranked.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 1.5),
        ('TOPPADDING', (0, 0), (-1, -1), 1.8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1.8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_ranked)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: SUBJECT PORTFOLIOS, TIME ALLOCATIONS & DEPENDENCY SYNERGY
    # =========================================================================
    story.append(Paragraph("5. Subject Targets: Core vs. Buffer & Minimum Accuracies", h1_style))
    story.append(Paragraph(
        "For every subject, the syllabus is split into Core Target (Layer A) and Buffer Target (Layer B), with explicit preparation caps.",
        body_style
    ))
    story.append(Spacer(1, 3))

    subj_target_header = [
        Paragraph("<b>Subject Module</b>", tbl_hdr),
        Paragraph("<b>Core Target (Mks)</b>", tbl_hdr_center),
        Paragraph("<b>Buffer Target (Mks)</b>", tbl_hdr_center),
        Paragraph("<b>Combined Exp.</b>", tbl_hdr_center),
        Paragraph("<b>Max Study Hours</b>", tbl_hdr_center),
        Paragraph("<b>Min Acc. Req.</b>", tbl_hdr_center),
        Paragraph("<b>Subject Treatment Policy</b>", tbl_hdr)
    ]
    subj_target_data = [
        ["General Aptitude", "7.0 (Quant+Spatial)", "4.5 (Verbal+DI)", "11.5 – 13.0", "25 Hrs", "88%", "FULL SUBJECT (High conversion, zero prerequisites)"],
        ["Engineering Mathematics", "8.0 (LA + Calc + 1st DE)", "3.5 (Prob + Complex)", "10.5 – 12.0", "45 Hrs", "85%", "FULL SUBJECT (Foundation for Signals/Control/Networks)"],
        ["Networks, Signals & Systems", "9.5 (KCL + Trans + LTI + ROC)", "3.5 (Resonance + Sampling)", "12.0 – 14.0", "50 Hrs", "85%", "FULL SUBJECT (Anchor technical block, negative covariance)"],
        ["Digital Circuits", "6.5 (MUX + K-Map + Timing)", "2.0 (Counters + ADC)", "7.5 – 8.5", "25 Hrs", "90%", "FULL SUBJECT (Safest technical ROI, 100% algorithmic)"],
        ["Control Systems", "4.5 (Bode + 2nd Order Time)", "2.5 (Routh + State Space)", "6.0 – 7.0", "30 Hrs", "85%", "SELECTIVE SUBJECT (Skip compensator circuit design)"],
        ["Electronic Devices (EDC)", "3.5 (MOSFET C-V + Vth)", "2.5 (PN Junction + Transport)", "5.0 – 6.5", "35 Hrs", "80%", "SELECTIVE SUBJECT (Master MOS/PN; drop BJT physics)"],
        ["Analog Circuits", "4.0 (Op-Amps + Schmitt)", "2.5 (Diodes + DC Biasing)", "5.5 – 7.0", "35 Hrs", "82%", "SELECTIVE SUBJECT (Master Op-Amps; drop Cascode HF response)"],
        ["Communications", "2.5 (Random Processes)", "4.0 (PCM + Info + Digital Mod)", "5.5 – 7.0", "40 Hrs", "78%", "SELECTIVE SUBJECT (Master Digital Baseband; drop Superheterodyne)"],
        ["Electromagnetics (EMTL)", "3.5 (Transmission Lines)", "1.8 (Plane Waves + Boundary)", "4.5 – 5.5", "25 Hrs", "80%", "SURVIVAL COVERAGE (Master T-Lines; drop Electro/Magnetostatics)"],
    ]
    t_subj_rows = [subj_target_header]
    for r in subj_target_data:
        row = [
            Paragraph(f"<b>{r[0]}</b>", tbl_cell_bold),
            Paragraph(r[1], tbl_cell_center),
            Paragraph(r[2], tbl_cell_center),
            Paragraph(f"<b>{r[3]}</b>", tbl_cell_center_bold),
            Paragraph(r[4], tbl_cell_center),
            Paragraph(r[5], tbl_cell_center_bold),
            Paragraph(r[6], tbl_cell)
        ]
        t_subj_rows.append(row)

    col_w_subj = [110, 85, 80, 68, 56, 56, 84]
    tbl_subj = Table(t_subj_rows, colWidths=col_w_subj)
    tbl_subj.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_secondary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.5),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_subj)
    story.append(Spacer(1, 6))

    # Study Time Allocations across 100, 200, 300, 400, 500 Hours
    story.append(Paragraph("6. Study-Time Allocation Engine (100h to 500h Scales)", h1_style))
    story.append(Paragraph(
        "Preparation hours must scale dynamically based on college workload and remaining days. Every allocation strictly sums to total available hours:",
        body_style
    ))
    story.append(Spacer(1, 3))

    time_alloc_header = [
        Paragraph("<b>Preparation Pillar</b>", tbl_hdr),
        Paragraph("<b>100 Hrs (Triage)</b>", tbl_hdr_center),
        Paragraph("<b>200 Hrs (Core)</b>", tbl_hdr_center),
        Paragraph("<b>300 Hrs (Target)</b>", tbl_hdr_center),
        Paragraph("<b>400 Hrs (Strong)</b>", tbl_hdr_center),
        Paragraph("<b>500 Hrs (Mastery)</b>", tbl_hdr_center)
    ]
    time_alloc_data = [
        ["Layer A: Core Concept Mastery", "30 Hrs", "55 Hrs", "75 Hrs", "95 Hrs", "110 Hrs"],
        ["Layer B: Buffer Topic Mastery", "10 Hrs", "25 Hrs", "45 Hrs", "60 Hrs", "80 Hrs"],
        ["Authentic GATE PYQ Practice", "25 Hrs", "50 Hrs", "75 Hrs", "105 Hrs", "130 Hrs"],
        ["Spaced Retrieval & Revision", "10 Hrs", "20 Hrs", "30 Hrs", "40 Hrs", "55 Hrs"],
        ["Mock Testing & Full Papers", "10 Hrs", "20 Hrs", "35 Hrs", "45 Hrs", "55 Hrs"],
        ["3-Line Error Log Correction", "5 Hrs", "12 Hrs", "20 Hrs", "25 Hrs", "35 Hrs"],
        ["General Aptitude Execution", "5 Hrs", "8 Hrs", "10 Hrs", "15 Hrs", "18 Hrs"],
        ["Engineering Mathematics Core", "5 Hrs", "10 Hrs", "10 Hrs", "15 Hrs", "17 Hrs"],
        ["TOTAL ALLOCATED HOURS", "100 Hrs", "200 Hrs", "300 Hrs", "400 Hrs", "500 Hrs"]
    ]
    t_time_rows = [time_alloc_header]
    for idx, r in enumerate(time_alloc_data):
        is_last = (idx == len(time_alloc_data) - 1)
        st = tbl_cell_bold if is_last else tbl_cell
        st_c = tbl_cell_center_bold if is_last else tbl_cell_center
        row = [
            Paragraph(f"<b>{r[0]}</b>", st),
            Paragraph(r[1], st_c),
            Paragraph(r[2], st_c),
            Paragraph(r[3], st_c),
            Paragraph(r[4], st_c),
            Paragraph(r[5], st_c)
        ]
        t_time_rows.append(row)

    col_w_time = [164, 75, 75, 75, 75, 75]
    tbl_time = Table(t_time_rows, colWidths=col_w_time)
    tbl_time.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.5),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, c_alt_row]),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#EFF6FF")),
    ]))
    story.append(tbl_time)
    story.append(Spacer(1, 6))

    # Optimal Subject Order & Synergies
    story.append(Paragraph("7. Optimal Subject Sequence & Cross-Discipline Synergies", h1_style))
    story.append(Paragraph(
        "Never study subjects in random order. Follow the <b>Prerequisite Synergy Chain</b> to minimize cognitive resistance and maximize concept reuse:",
        body_style
    ))
    story.append(Spacer(1, 3))

    synergy_chain = [
        ("STAGE 1 — Mathematical & Circuit Engine:", "Engineering Mathematics (Linear Algebra + Calculus) → Network Theory (KCL/KVL, Thevenin, Transients). Linear algebra enables state space; calculus enables transient DEs; network theorems are direct prerequisites for Analog Circuits."),
        ("STAGE 2 — Transform & Systems Pipeline:", "Signals & Systems (LTI, CTFT, Laplace, Z-Transform) → Control Systems (Bode, Routh, Time Response). Laplace transform and s-domain transfer functions transfer 100% between Signals and Control with zero redundant overhead."),
        ("STAGE 3 — Digital & Semiconductor Hardware:", "Digital Circuits (K-Maps, Combinational, Timing Analysis) → Electronic Devices (Carrier transport, PN diode, MOSFET C-V physics). Digital circuits provide high-speed confidence; EDC physics establishes boundary conditions for Analog Circuits."),
        ("STAGE 4 — Circuit Synthesis & Waves:", "Analog Circuits (Op-Amps, DC Biasing, Schmitt Trigger) → Communications (Random Processes, PCM, Digital Modulation) → Electromagnetics (Transmission Lines, Plane Waves). Op-Amp feedback builds on Control; Communications builds on Probability and Signals."),
        ("STAGE 5 — General Aptitude Integration:", "Interleaved 30 minutes daily on alternate mornings. Never postponed to the final month.")
    ]
    for s_title, s_desc in synergy_chain:
        story.append(Paragraph(f"• <b>{s_title}</b> {s_desc}", body_style))
        story.append(Spacer(1, 1.5))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: DAILY SYSTEM, SPACED REPETITION & ERROR TAXONOMY
    # =========================================================================
    story.append(Paragraph("8. The Daily Execution Architecture (4h, 6h & 8h Templates)", h1_style))
    story.append(Paragraph(
        "Every daily study block must enforce the active sequence: <b>CONCEPT (30%) → ACTIVE RECALL (10%) → PYQ SOLVING (40%) → ERROR LOGGING (20%)</b>. Never consume passive video lectures consecutively.",
        body_style
    ))
    story.append(Spacer(1, 3))

    sched_header = [
        Paragraph("<b>Time Budget</b>", tbl_hdr),
        Paragraph("<b>Morning Block (Focus Engine)</b>", tbl_hdr),
        Paragraph("<b>Afternoon Block (Problem Solving)</b>", tbl_hdr),
        Paragraph("<b>Evening Block (Audit & Synthesis)</b>", tbl_hdr)
    ]
    sched_data = [
        [
            Paragraph("<b>4-Hour Day</b><br/><font color='#64748B'>College Semester Mode</font>", tbl_cell_bold),
            Paragraph("<b>6:00 AM – 7:30 AM (1.5h):</b><br/>New concept ingestion (P0 topic) + 1-page formula card distillation.", tbl_cell),
            Paragraph("<b>5:30 PM – 7:00 PM (1.5h):</b><br/>Untimed solving of 12–15 GATE PYQs without reference notes.", tbl_cell),
            Paragraph("<b>9:30 PM – 10:30 PM (1.0h):</b><br/>3-Line Error Log entry for missed PYQs + 15m GA practice.", tbl_cell)
        ],
        [
            Paragraph("<b>6-Hour Day</b><br/><font color='#64748B'>Standard Target Mode</font>", tbl_cell_bold),
            Paragraph("<b>6:00 AM – 8:30 AM (2.5h):</b><br/>Core theory mastery + active recall testing on blank paper.", tbl_cell),
            Paragraph("<b>2:00 PM – 4:00 PM (2.0h):</b><br/>20–25 authentic GATE PYQs under timed conditions (3m/question).", tbl_cell),
            Paragraph("<b>7:30 PM – 9:00 PM (1.5h):</b><br/>3-Line Error Log analysis + Spaced Retrieval (R3/R7 bucket review).", tbl_cell)
        ],
        [
            Paragraph("<b>8-Hour Day</b><br/><font color='#64748B'>Weekend / Vacation Mode</font>", tbl_cell_bold),
            Paragraph("<b>8:30 AM – 11:30 AM (3.0h):</b><br/>Deep theory acquisition + 1-page formula card in Formula Vault.", tbl_cell),
            Paragraph("<b>1:30 PM – 4:30 PM (3.0h):</b><br/>Intensive 30–35 PYQ drill + sectional timed test on completed module.", tbl_cell),
            Paragraph("<b>6:30 PM – 8:30 PM (2.0h):</b><br/>Root-cause error categorization + Red-bucket review + GA module.", tbl_cell)
        ]
    ]
    col_w_sched = [95, 148, 148, 148]
    tbl_sched = Table([sched_header] + sched_data, colWidths=col_w_sched)
    tbl_sched.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 3.5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_sched)
    story.append(Spacer(1, 6))

    # Spaced Repetition Engine
    story.append(Paragraph("9. The Dynamic Spaced Repetition Engine & 3 Color Buckets", h1_style))
    story.append(Paragraph(
        "Never revise blindly. Categorize all completed topics into three dynamic buckets based on actual recall performance:",
        body_style
    ))
    story.append(Spacer(1, 3))

    sr_data = [
        [
            Paragraph("<b>Bucket Category</b>", tbl_hdr),
            Paragraph("<b>Trigger Condition (Mock / PYQ Data)</b>", tbl_hdr),
            Paragraph("<b>Review Frequency</b>", tbl_hdr_center),
            Paragraph("<b>Action Protocol (Time-Capped)</b>", tbl_hdr)
        ],
        [
            Paragraph("<b><font color='#DC2626'>RED BUCKET</font></b><br/>High Leakage", tbl_cell_bold),
            Paragraph("PYQ accuracy &lt; 75% OR question missed in recent test due to formula/concept lapse.", tbl_cell),
            Paragraph("<b>Every 3 Days</b> (R3 Cycle)", tbl_cell_center_bold),
            Paragraph("Solve 5 fresh problems from scratch without notes. Re-write 1-page formula card. Time cap: 25 mins.", tbl_cell)
        ],
        [
            Paragraph("<b><font color='#D97706'>YELLOW BUCKET</font></b><br/>Partially Reliable", tbl_cell_bold),
            Paragraph("PYQ accuracy 75–85% OR correct but slow (&gt; 3.5 mins per mark).", tbl_cell),
            Paragraph("<b>Every 7 Days</b> (R7 Cycle)", tbl_cell_center_bold),
            Paragraph("10-minute rapid formula flashcard recall + 3 timed PYQ problems. Time cap: 15 mins.", tbl_cell)
        ],
        [
            Paragraph("<b><font color='#059669'>GREEN BUCKET</font></b><br/>Bankable / Mastered", tbl_cell_bold),
            Paragraph("PYQ accuracy &gt; 85% AND solved in &lt; 2.5 mins/mark across last two assessments.", tbl_cell),
            Paragraph("<b>Every 21–30 Days</b> (R30)", tbl_cell_center_bold),
            Paragraph("Zero re-reading. Tested only via full-length mocks. Protects against over-studying. Time cap: 5 mins.", tbl_cell)
        ]
    ]
    col_w_sr = [95, 170, 100, 174]
    tbl_sr = Table(sr_data, colWidths=col_w_sr)
    tbl_sr.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_secondary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 3),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_sr)
    story.append(Spacer(1, 6))

    # Error Taxonomy C1 to C8
    story.append(Paragraph("10. Root-Cause Error Taxonomy (C1 to C8)", h1_style))
    story.append(Paragraph(
        "A student who scores 51 instead of 57 does not lack syllabus coverage; they leak marks through unclassified error patterns. "
        "Every missed question in a mock or PYQ session must be tagged with an explicit code:",
        body_style
    ))
    story.append(Spacer(1, 3))

    err_data = [
        [
            Paragraph("<b>Code</b>", tbl_hdr_center),
            Paragraph("<b>Taxonomy Classification</b>", tbl_hdr),
            Paragraph("<b>Root Cause & Psychological Mechanism</b>", tbl_hdr),
            Paragraph("<b>Immediate Corrective Protocol</b>", tbl_hdr)
        ],
        [
            Paragraph("<b>C1</b>", tbl_cell_center_bold), Paragraph("Concept Gap", tbl_cell_bold),
            Paragraph("Fundamental misunderstanding of boundary condition or law.", tbl_cell),
            Paragraph("Return to 1-page formula card. Re-solve 3 standard textbook examples.", tbl_cell)
        ],
        [
            Paragraph("<b>C2</b>", tbl_cell_center_bold), Paragraph("Formula Lapsed", tbl_cell_bold),
            Paragraph("Forgotten factor of 2, π, square root, or sign convention.", tbl_cell),
            Paragraph("Add formula to Formula Vault. Schedule for 3 consecutive days in Red Bucket.", tbl_cell)
        ],
        [
            Paragraph("<b>C3</b>", tbl_cell_center_bold), Paragraph("Calculation Error", tbl_cell_bold),
            Paragraph("TCS Virtual Calculator slip, arithmetic typo, or rounding off too early.", tbl_cell),
            Paragraph("Write down full intermediate calculation line. Round off ONLY at final answer.", tbl_cell)
        ],
        [
            Paragraph("<b>C4</b>", tbl_cell_center_bold), Paragraph("Misread Question", tbl_cell_bold),
            Paragraph("Missed 'NOT', asked for peak-to-peak instead of RMS, or rad/s vs Hz.", tbl_cell),
            Paragraph("Mandatory 5-second underline rule: Circle given units and required variable.", tbl_cell)
        ],
        [
            Paragraph("<b>C5</b>", tbl_cell_center_bold), Paragraph("Time Pressure Panic", tbl_cell_bold),
            Paragraph("Rushed solving in final 20 minutes without verifying steps.", tbl_cell),
            Paragraph("Enforce 3-Pass Exam Strategy: Never solve multi-step problems in Pass 1.", tbl_cell)
        ],
        [
            Paragraph("<b>C6</b>", tbl_cell_center_bold), Paragraph("Wrong Method Choice", tbl_cell_bold),
            Paragraph("Used 20-minute differential equation instead of Laplace/s-domain model.", tbl_cell),
            Paragraph("Log shortcut equivalence into Error Log book: 'When circuit has X, use Y.'", tbl_cell)
        ],
        [
            Paragraph("<b>C7</b>", tbl_cell_center_bold), Paragraph("Sign / Unit Mismatch", tbl_cell_bold),
            Paragraph("Mixed cm with m, mA with A, or flipped inverting terminal polarity.", tbl_cell),
            Paragraph("Write explicit SI unit next to every substitution variable on rough pad.", tbl_cell)
        ],
        [
            Paragraph("<b>C8</b>", tbl_cell_center_bold), Paragraph("Blind Guess / Gambling", tbl_cell_bold),
            Paragraph("Attempted a 50/50 MCQ without mathematical certainty; incurred negative.", tbl_cell),
            Paragraph("Strict zero-guess rule: In MCQs, if no option is eliminated by proof, skip instantly.", tbl_cell)
        ]
    ]
    col_w_err = [30, 110, 205, 194]
    tbl_err = Table(err_data, colWidths=col_w_err)
    tbl_err.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.4),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_err)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: MOCK WATERFALL, CONFIDENCE CALCULATOR & DYNAMIC PRIORITY
    # =========================================================================
    story.append(Paragraph("11. The Score Waterfall & 'Marks Left on Table' Engine", h1_style))
    story.append(Paragraph(
        "Never analyze a mock exam simply by the final score. Map where marks disappeared through the <b>Score Waterfall</b>:",
        body_style
    ))
    story.append(Spacer(1, 3))

    waterfall_box = [
        [
            Paragraph("<b>THE EXAM SCORE WATERFALL DECONSTRUCTION:</b><br/>"
                      "1. <b>Theoretical Available Marks:</b> 100 Marks (100% Paper)<br/>"
                      "2. <b>Recognized Questions (Within Prepared Syllabus):</b> ~78.0 Marks (22M outside syllabus or skipped)<br/>"
                      "3. <b>Attempted Questions:</b> ~68.0 Marks (10M skipped due to perceived difficulty or time)<br/>"
                      "4. <b>Gross Correct Marks:</b> ~58.0 Marks (10M attempted but incorrect)<br/>"
                      "5. <b>Negative Marking Deductions (C1–C8 Errors):</b> −3.3 Marks<br/>"
                      "6. <b>FINAL NET SCORE REALIZED:</b> <b>54.7 MARKS</b><br/>"
                      "• <b>MARKS LEFT ON TABLE:</b> (Questions recognized but failed due to C2–C7) = <b>+7.0 Marks</b>.<br/>"
                      "• <b>The Strategic Directive:</b> The candidate does NOT need to study more syllabus. They need to stop leaking those 7 marks!",
                      callout_style)
        ]
    ]
    tbl_wf = Table(waterfall_box, colWidths=[539])
    tbl_wf.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(tbl_wf)
    story.append(Spacer(1, 6))

    # Numerical Confidence Calculator
    story.append(Paragraph("12. Performance-Grounded Confidence Matrix (Not Syllabus %)", h1_style))
    story.append(Paragraph(
        "Confidence is not a motivational feeling. It is a mathematical probability derived from rolling mock exam statistics:",
        body_style
    ))
    story.append(Spacer(1, 3))

    conf_header = [
        Paragraph("<b>Rolling Mock Avg (Last 5)</b>", tbl_hdr_center),
        Paragraph("<b>Worst Mock in Window</b>", tbl_hdr_center),
        Paragraph("<b>P(Score ≥ 50)</b>", tbl_hdr_center),
        Paragraph("<b>P(Score ≥ 55)</b>", tbl_hdr_center),
        Paragraph("<b>P(Score ≥ 60)</b>", tbl_hdr_center),
        Paragraph("<b>Operational Readiness Assessment</b>", tbl_hdr)
    ]
    conf_data = [
        [Paragraph("< 46.0 Marks", tbl_cell_center), Paragraph("< 40.0 Marks", tbl_cell_center), Paragraph("35%", tbl_cell_center), Paragraph("<font color='#DC2626'><b>15%</b></font>", tbl_cell_center_bold), Paragraph("5%", tbl_cell_center), Paragraph("<font color='#DC2626'><b>CRITICAL DEFICIT:</b> Core Layer A syllabus incomplete or severe leakage.</font>", tbl_cell)],
        [Paragraph("46.0 – 50.0 Marks", tbl_cell_center), Paragraph("41.0 – 44.0 Marks", tbl_cell_center), Paragraph("65%", tbl_cell_center), Paragraph("<font color='#D97706'><b>40%</b></font>", tbl_cell_center_bold), Paragraph("18%", tbl_cell_center), Paragraph("<font color='#D97706'><b>VULNERABLE:</b> Highly sensitive to hostile paper question distributions.</font>", tbl_cell)],
        [Paragraph("51.0 – 54.0 Marks", tbl_cell_center), Paragraph("45.0 – 48.0 Marks", tbl_cell_center), Paragraph("85%", tbl_cell_center), Paragraph("<font color='#D97706'><b>60%</b></font>", tbl_cell_center_bold), Paragraph("35%", tbl_cell_center), Paragraph("<b>APPROACHING TARGET:</b> Needs error leakage plugged in GA and Math.", tbl_cell)],
        [Paragraph("55.0 – 58.0 Marks", tbl_cell_center), Paragraph("49.0 – 52.0 Marks", tbl_cell_center), Paragraph("94%", tbl_cell_center), Paragraph("<b>75%</b>", tbl_cell_center_bold), Paragraph("50%", tbl_cell_center), Paragraph("<font color='#2563EB'><b>ACCEPTABLE BUFFER:</b> 55 marks achievable; buffer slightly tight.</font>", tbl_cell)],
        [Paragraph("59.0 – 63.0 Marks", tbl_cell_center), Paragraph("53.0 – 56.0 Marks", tbl_cell_center), Paragraph("98%", tbl_cell_center), Paragraph("<b><font color='#059669'>88%</font></b>", tbl_cell_center_bold), Paragraph("72%", tbl_cell_center), Paragraph("<b><font color='#059669'>TARGET CONFIDENCE ZONE (85–90%):</font></b> 55 marks insulated against bad papers.", tbl_cell)],
        [Paragraph("≥ 64.0 Marks", tbl_cell_center), Paragraph("≥ 57.0 Marks", tbl_cell_center), Paragraph("> 99%", tbl_cell_center), Paragraph("<b><font color='#059669'>96%</font></b>", tbl_cell_center_bold), Paragraph("88%", tbl_cell_center), Paragraph("<b><font color='#059669'>ELITE COHORT:</font></b> Guaranteed IIIT-B List 1 / Eligible for Top IITs.", tbl_cell)],
    ]
    col_w_conf = [85, 80, 56, 56, 56, 206]
    tbl_conf = Table([conf_header] + conf_data, colWidths=col_w_conf)
    tbl_conf.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
        ('BACKGROUND', (0, 5), (-1, 5), colors.HexColor("#ECFDF5")),
    ]))
    story.append(tbl_conf)
    story.append(Spacer(1, 6))

    # Dynamic Priority Algorithm Box
    story.append(Paragraph("13. Dynamic Weekly Priority Algorithm (The Adaptive Feedback Loop)", h1_style))
    algo_box = [
        [
            Paragraph("<b>THE WEEKLY 5-STEP ADAPTIVE FEEDBACK PROTOCOL:</b><br/>"
                      "1. <b>Sunday Mock Test (3.0 Hours):</b> Execute full-length or sectional timed test under examination conditions.<br/>"
                      "2. <b>Post-Exam Audit (1.5 Hours):</b> Fill the Score Waterfall. Calculate <i>Marks Left on Table</i>. Code all errors C1–C8.<br/>"
                      "3. <b>Identify Top 3 Leakage Areas:</b> Rank topics by points lost (e.g., 'Lost 4 marks in Op-Amps due to C3; lost 2 marks in Bode slopes due to C2').<br/>"
                      "4. <b>Dynamic Time Re-Allocation:</b> Re-route 6 hours of next week's study time directly into those top 3 leakage topics. Demote mastered topics into the Green Bucket.<br/>"
                      "5. <b>Saturday Targeted Retest:</b> 30-minute re-test containing 10 problems exclusively on the previous week's leakage topics. Verify ≥ 80% resolution.",
                      callout_style)
        ]
    ]
    tbl_algo = Table(algo_box, colWidths=[539])
    tbl_algo.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor("#93C5FD")),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(tbl_algo)
    story.append(Spacer(1, 6))

    # Stop / Abandon Rules
    story.append(Paragraph("14. Boundary Control: 'When to Stop' vs. 'When to Abandon'", h1_style))
    stop_rules = [
        ("RULE 1: When to Stop Studying a Mastered Topic:", "If you achieve <b>≥ 85% accuracy across 25 authentic GATE PYQs</b> and can solve standard 2-mark questions in <b>&le; 3.0 minutes without looking at notes</b>, STOP immediately. Move topic to Green Bucket. Further hours yield near-zero marginal return."),
        ("RULE 2: When to Abandon a Low-Return Topic:", "If a topic requires <b>&gt; 12 preparation hours</b> but you remain below 60% accuracy on PYQs, and the topic's expected weightage is <b>&le; 1.5 marks with zero downstream dependencies</b> (e.g., Cascode High-Frequency Response or Antennas), ABANDON immediately. Demote to Layer C (Survival Coverage).")
    ]
    for r_title, r_desc in stop_rules:
        story.append(Paragraph(f"• <b>{r_title}</b> {r_desc}", body_style))
        story.append(Spacer(1, 1.5))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: RISK MANAGEMENT, EXAM-DAY PROTOCOL & 1-PAGE DIRECTIVE
    # =========================================================================
    story.append(Paragraph("15. Risk Management: 12 Failure Modes & Defensive Mitigations", h1_style))
    story.append(Paragraph("The primary failure modes that cause GATE score collapses, with explicit countermeasures:", body_style))
    story.append(Spacer(1, 3))

    risk_header = [
        Paragraph("<b>Failure Mode Mechanism</b>", tbl_hdr),
        Paragraph("<b>Prob.</b>", tbl_hdr_center),
        Paragraph("<b>Impact</b>", tbl_hdr_center),
        Paragraph("<b>Defensive Mitigation Protocol</b>", tbl_hdr)
    ]
    risk_data = [
        [Paragraph("1. Paper Question Distribution Shock", tbl_cell_bold), Paragraph("Med", tbl_cell_center), Paragraph("High", tbl_cell_center), Paragraph("Insulated by Layer B buffer topics across 8 subjects. Zero dependence on single subject.", tbl_cell)],
        [Paragraph("2. Math or GA Execution Collapse", tbl_cell_bold), Paragraph("Low", tbl_cell_center), Paragraph("Fatal", tbl_cell_center), Paragraph("Daily 30m interleaved practice. Math+GA treated as non-negotiable core reliability firewall.", tbl_cell)],
        [Paragraph("3. Negative Marking Bleed (> 5 Marks)", tbl_cell_bold), Paragraph("High", tbl_cell_center), Paragraph("High", tbl_cell_center), Paragraph("Strict C8 Zero-Guessing rule on MCQs. NAT questions carry zero negative — maximize attempts.", tbl_cell)],
        [Paragraph("4. Time Panic on Unfamiliar 2-Mark Circuit", tbl_cell_bold), Paragraph("High", tbl_cell_center), Paragraph("Med", tbl_cell_center), Paragraph("Mandatory 3-Minute Circuit Rule: If no KCL equation written in 90 seconds, flag and skip.", tbl_cell)],
        [Paragraph("5. Passive Video Lecture Over-Consumption", tbl_cell_bold), Paragraph("High", tbl_cell_center), Paragraph("High", tbl_cell_center), Paragraph("Strict 30% Theory / 70% Problem Solving daily rule. Lecture watching without pen is forbidden.", tbl_cell)],
        [Paragraph("6. Completely Dropping an Entire Subject", tbl_cell_bold), Paragraph("Med", tbl_cell_center), Paragraph("High", tbl_cell_center), Paragraph("Survival Coverage: Learn basic formulas for EMTL/Comm to capture easy 1-mark giveaways.", tbl_cell)],
    ]
    col_w_risk = [145, 38, 42, 314]
    tbl_risk = Table([risk_header] + risk_data, colWidths=col_w_risk)
    tbl_risk.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_secondary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.2),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_risk)
    story.append(Spacer(1, 5))

    # Exam-Day 3-Pass Attempt Strategy
    story.append(Paragraph("16. The Exam-Day 3-Pass Attempt Strategy (180 Minutes)", h1_style))
    exam_strategy_data = [
        [
            Paragraph("<b>PASS 1: The Low-Hanging Harvest (Minutes 0 – 65):</b><br/>"
                      "• Scan all 65 questions. Solve <b>only 100% familiar Level-1/Level-2 questions</b> (K-maps, simple Op-Amps, Routh arrays, standard GA, Eigenvalues).<br/>"
                      "• If any problem requires multi-step derivation, mark for review and skip immediately.<br/>"
                      "• <b>Target Outcome:</b> 22–26 questions answered correctly. <b>~30–35 marks banked in first hour</b>. Psychological calm achieved.",
                      body_style)
        ],
        [
            Paragraph("<b>PASS 2: The Core Problem-Solving Engine (Minutes 65 – 150):</b><br/>"
                      "• Solve marked technical problems requiring 3 to 4 minutes of calculation (Transients, Bode plots, MOSFET biasing, PCM SNRq).<br/>"
                      "• Verify intermediate calculator steps. Write units on rough sheet.<br/>"
                      "• <b>Target Outcome:</b> Additional 16–20 questions solved. <b>Cumulative score reaches 52–58 marks</b>. Target secured.",
                      body_style)
        ],
        [
            Paragraph("<b>PASS 3: The Verification & Buffer Pass (Minutes 150 – 180):</b><br/>"
                      "• Review all NAT numerical calculations. Check unit conversions (Hz vs rad/s, mA vs A).<br/>"
                      "• Attempt selective Layer B buffer questions. Zero wild guesses on MCQs.<br/>"
                      "• <b>Target Outcome:</b> Lock in final 3–5 buffer marks. Prevent negative leakage. Final score: <b>58–64 Marks</b>.",
                      body_style)
        ]
    ]
    tbl_exam = Table(exam_strategy_data, colWidths=[539])
    tbl_exam.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(tbl_exam)
    story.append(Spacer(1, 5))

    # The 1-Page "Do This / Don't Do This" Action Sheet
    story.append(Paragraph("17. One-Page Operational Directive: 'Do This / Don't Do This'", h1_style))
    dodont_data = [
        [
            Paragraph("<b>✅ DO THIS (High-ROI Conversion)</b>", tbl_hdr),
            Paragraph("<b>❌ DON'T DO THIS (Score-Destroying Traps)</b>", tbl_hdr)
        ],
        [
            Paragraph("• Solve 20+ years of GATE PYQs exclusively with pen & paper.<br/>"
                      "• Track every missed mark using the C1–C8 Error Taxonomy.<br/>"
                      "• Maintain 1-page formula distillation cards for all P0 topics.<br/>"
                      "• Practice TCS Virtual Calculator keyboard shortcuts daily.<br/>"
                      "• Interleave General Aptitude & Linear Algebra every single week.<br/>"
                      "• Use the 3-Pass system on every full-length mock exam.<br/>"
                      "• Base confidence strictly on rolling 5-mock performance.", tbl_cell),
            Paragraph("• Don't watch passive 100-hour video lecture series without solving.<br/>"
                      "• Don't gamble on 50/50 MCQs — negative marking kills cutoffs.<br/>"
                      "• Don't study multi-stage Cascode high-frequency AC derivations.<br/>"
                      "• Don't solve 3D spherical volume integrals in Electrostatics.<br/>"
                      "• Don't re-read textbooks for topics already in the Green Bucket.<br/>"
                      "• Don't wait until December to start full-length 3-hour mocks.<br/>"
                      "• Don't assume 85% confidence until mocks consistently exceed 58M.", tbl_cell)
        ]
    ]
    col_w_dodont = [269.5, 269.5]
    tbl_dodont = Table(dodont_data, colWidths=col_w_dodont)
    tbl_dodont.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 3.5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 1), (0, 1), colors.HexColor("#F0FDF4")),
        ('BACKGROUND', (1, 1), (1, 1), colors.HexColor("#FEF2F2")),
    ]))
    story.append(tbl_dodont)
    story.append(Spacer(1, 5))

    # Overall Preparation Metric Target Table
    story.append(Paragraph("18. Overall Preparation Target Audit Table", h1_style))
    target_kpi_header = [
        Paragraph("<b>Preparation & Mock Metric</b>", tbl_hdr),
        Paragraph("<b>Target Benchmark</b>", tbl_hdr_center),
        Paragraph("<b>Current Status Audit</b>", tbl_hdr_center),
        Paragraph("<b>Strategic Rationale</b>", tbl_hdr)
    ]
    target_kpi_data = [
        ["General Aptitude Score", "12.0 – 13.5 / 15", "Active Focus", "Non-negotiable scoring anchor; protects technical syllabus."],
        ["Engineering Mathematics Score", "9.5 – 11.0 / 13", "Active Focus", "Linear algebra + Calculus template invariance."],
        ["Technical Core Score (Layer A)", "28.0 – 32.0 / 42", "In Progress", "High-conversion algorithmic technical foundations."],
        ["Technical Buffer Score (Layer B)", "12.0 – 15.0 / 22", "Queued", "Hedge against paper variance and hostile questions."],
        ["Overall PYQ Accuracy (Pass 1)", "≥ 80.0%", "Required Gate", "Minimum threshold before topic moves to Yellow/Green."],
        ["P0 Mandatory Topic Mastery", "100.0% (17/17)", "Strict Mandate", "Zero blind spots permitted across Tier 1 core."],
        ["Rolling 5-Mock Average Score", "60.0 – 65.0 Marks", "Milestone Target", "Demonstrated mock capability required for 85–90% confidence."],
        ["Worst Recent Mock in Window", "≥ 52.0 Marks", "Defensive Floor", "Guarantees that a hostile paper still clears IIIT-B cutoff."],
        ["Negative Marking Leakage", "≤ 2.5 Marks Total", "Strict Mandate", "C8 zero-guessing and C4 question underline discipline."],
        ["Easy-Question Miss Rate", "< 5.0%", "Zero-Tolerance", "Eliminates silly mistakes on level-1/level-2 questions."],
        ["P(Final Score ≥ 55 Marks)", "85 – 90%", "Target Confidence", "Valid only when mock performance consistently clears 60M."]
    ]
    t_target_rows = [target_kpi_header]
    for r in target_kpi_data:
        row = [
            Paragraph(f"<b>{r[0]}</b>", tbl_cell),
            Paragraph(r[1], tbl_cell_center_bold),
            Paragraph(r[2], tbl_cell_center),
            Paragraph(r[3], tbl_cell)
        ]
        t_target_rows.append(row)

    col_w_target = [145, 90, 80, 224]
    tbl_target = Table(t_target_rows, colWidths=col_w_target)
    tbl_target.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_secondary),
        ('BOX', (0, 0), (-1, -1), 0.8, c_border),
        ('INNERGRID', (0, 0), (-1, -1), 0.4, c_border),
        ('PADDING', (0, 0), (-1, -1), 2.0),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_alt_row]),
    ]))
    story.append(tbl_target)

    # Build the document using NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Document successfully created: {filename}")

if __name__ == '__main__':
    output_pdf = "GATE_2027_ECE_55Mark_Master_Strategy.pdf"
    if len(sys.argv) > 1:
        output_pdf = sys.argv[1]
    build_pdf(output_pdf)
