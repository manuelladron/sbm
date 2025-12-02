# Tokenizing Buildings: A Transformer for Layout Synthesis

<p align="center">
  <img src="static/images/hero.png" alt="SBM generates functionally correct and semantically coherent layouts given a room envelope" width="100%">
</p>

<p align="center">
  <strong>Small Building Model (SBM)</strong> is an encoder-decoder Transformer that generates functionally correct and semantically coherent layouts given a room envelope.
</p>

<p align="center">
  <a href="./static/paper/sbm.pdf"><img src="https://img.shields.io/badge/Paper-PDF-red?style=for-the-badge&logo=adobeacrobatreader" alt="Paper PDF"></a>
  <a href="#"><img src="https://img.shields.io/badge/arXiv-coming_soon-b31b1b?style=for-the-badge&logo=arxiv" alt="arXiv"></a>
  <a href="#"><img src="https://img.shields.io/badge/Code-coming_soon-black?style=for-the-badge&logo=github" alt="Code"></a>
</p>

---

## Abstract

We introduce **Small Building Models (SBM)**, a Transformer-based architecture for layout synthesis in Building Information Modeling (BIM) scenes. We address the question of how to *tokenize buildings* by unifying heterogeneous feature sets of architectural elements into sequences while preserving compositional structure. Such feature sets are represented as a **sparse attribute-feature matrix** that captures room properties. We then design a **unified embedding module** that learns joint representations of categorical and possibly correlated continuous feature groups.

We train a single Transformer backbone in two modes: an **encoder-only pathway** that yields high-fidelity room embeddings, and an **encoder-decoder pipeline** for autoregressive prediction of room entities—referred to as **Data-Driven Entity Prediction (DDEP)**. Experiments across retrieval and generative layout synthesis show that SBM learns compact room embeddings that reliably cluster by type and topology, enabling strong semantic retrieval. In DDEP mode, SBM produces functionally sound layouts—with fewer collisions and boundary violations and improved navigability.

---

## Method Overview

<p align="center">
  <img src="static/images/model_overview.png" alt="SBM Architecture Overview" width="100%">
</p>

**(a)** BIM data extraction and assembly into a discrete set of token bundles. **(b)** SBM encoder stack processes the tokenized feature-attribute matrix and outputs a room representation. **(c)** SBM decoder stack consumes the room representation as memory to the cross-attention layers and the room entities as inputs, trained on next token prediction. **(d)** Use cases: DDEP, information retrieval, and user-guided DDEP with an agentic layer.

---

## Results

### DDEP Benchmark

<p align="center">
  <img src="static/images/DDEP_benchmark_CVPR.png" alt="DDEP Benchmark Results" width="90%">
</p>

DDEP delivers **near-complete inventory satisfaction**, **state-of-the-art navigability**, and the **lowest violation rates** across LLM/VLM and domain-specific baselines.

### Room Embeddings

<p align="center">
  <img src="static/images/Clustering.png" alt="UMAP visualization of room embeddings" width="90%">
</p>

**UMAP visualization of room embeddings** colored by room type category. SBM embeddings (left, NMI: 0.640) exhibit well-separated clusters with distinct boundaries. The 1.7× higher NMI score reflects SBM's specialization in capturing geometric structure and spatial relationships.

| Metric | SBM | Best Text Baseline |
|--------|-----|-------------------|
| **NMI Score** | 0.640 | 0.371 (E5-Large-v2) |
| **Triplet Accuracy** | 100% | — |
| **Entity Overlap** | 78.9% | — |

---

## Citation

<!-- ```bibtex
@inproceedings{sbm2025cvpr,
  title={Tokenizing Buildings: A Transformer for Layout Synthesis},
  author={Ladron de Guevara, Manuel and Rhee, Jinmo and Bidgoli, Ardavan and Razgaitis, Vaidas and Bergin, Michael},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2025}
}
``` -->

---

## Website

This repository contains the project website. To run locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## License

This website template is licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).

Website template based on [Nerfies](https://nerfies.github.io/).
