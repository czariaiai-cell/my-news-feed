# Mama Health Monitor

## Purpose

Public Polish-language health digest for the user's mother. It monitors
neurobiology, physiotherapy and carefully contextualized TCM topics without
promising treatment outcomes or replacing clinical care.

## Scope — DECIDED 2026-09-03

- hand and foot acupressure;
- thiamine and peripheral-neuropathy education;
- TCM-related approaches to spine symptoms;
- TCM “dampness/cold”, warming diet, herbs and moxibustion.

## Operating policy

- The public page is `mama-zdrowie.html`; its content is
  `data/mama-zdrowie.json`.
- The canonical reusable workflow is the `mama-health-monitor` skill in the
  Codex and Hermes custom-skill directories.
- Research must favor PubMed, primary studies, systematic reviews, NIH/NCCIH,
  clinical guidance and qualified professional sources. Material must be
  translated and summarized in Polish.
- TCM concepts are explicitly labelled as traditional frameworks, not
  biomedical diagnoses. Evidence strength and uncertainty are presented.
- No individualized diagnosis, high-dose supplement plan, medication change or
  advice that delays professional care is allowed. Red flags and relevant
  safety cautions are mandatory.

## Initial baseline

The 2026-09-03 baseline covers NIH thiamine information, NCCIH acupuncture
guidance, a PubMed moxibustion review and a PubMed reflexology review. It is a
starting library, not a claim of daily clinical relevance.

## Next

- Configure an explicit Hermes daily schedule only after selecting a time and
  verifying that the execution environment can access the required sources.
- Keep a processed-source history and add only unique, materially useful
  content.

Back to [[index|Wiki MOC]].
