import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";

export const gemini = () =>
  new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_KEY });

export const chatgpt = () =>
  new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

export const claude = () =>
  new Anthropic({
    apiKey: process.env.REACT_APP_CLAUDE_KEY,
    dangerouslyAllowBrowser: true,
  });

export const dropdownOptions = (tags) => {
  if (!tags) return [];
  const dropdownOptions = Object.keys(tags).map((key) => ({
    value: key,
    label: key,
  }));
  return dropdownOptions;
};

export const transformTagData = (data) => {
  if (!data || !Array.isArray(data)) return [];

  return data.reduce((acc, item) => {
    acc[item.tag_name] = item.description;
    return acc;
  }, {});
};
