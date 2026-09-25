// Lightweight Pretrained COCO-SSD Model Loader for Physical Safety Screening
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let cocoModel = null;
let cocoModelPromise = null;
let isModelLoading = false;

export async function initVisionModel() {
  if (cocoModel) return cocoModel;
  if (isModelLoading && cocoModelPromise) return cocoModelPromise;

  isModelLoading = true;
  cocoModelPromise = (async () => {
    try {
      const ssdModule = (typeof window !== 'undefined' && window.cocoSsd) 
        ? window.cocoSsd 
        : cocoSsd;
      const model = await ssdModule.load();
      cocoModel = model;
      isModelLoading = false;
      return model;
    } catch (err) {
      console.warn('[COCO-SSD] Model init fallback warning:', err);
      isModelLoading = false;
      return null;
    }
  })();

  return cocoModelPromise;
}
