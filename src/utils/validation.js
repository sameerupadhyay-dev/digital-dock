import { isValidWebUrl } from './url.js';

export const VALID_CHANNELS = ['Movie Dock', 'Study Dock', 'Game Dock'];

export const CHANNEL_CATEGORIES = {
  'Movie Dock': ['Animation', 'Media Archive', 'Public Domain', 'Documentary', 'Tools'],
  'Study Dock': ['Documentation', 'Interactive Learning', 'Academic', 'Foundational Study', 'Reference'],
  'Game Dock': ['Game Engine', 'Asset Creation', 'Indie & Open Source', 'Game Assets', 'Tools']
};

/**
 * Validates resource submission fields.
 * @param {{ channel: string, title: string, category: string, url: string, desc: string }} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateResourceForm(data) {
  const errors = {};

  // Channel validation
  if (!data.channel || !VALID_CHANNELS.includes(data.channel)) {
    errors.channel = 'Please select a valid channel (Movie, Study, or Game Dock).';
  }

  // Title validation
  const trimmedTitle = (data.title || '').trim();
  if (!trimmedTitle) {
    errors.title = 'Resource title is required.';
  } else if (trimmedTitle.length < 2) {
    errors.title = 'Title must be at least 2 characters.';
  } else if (trimmedTitle.length > 100) {
    errors.title = 'Title cannot exceed 100 characters.';
  }

  // Category validation
  const trimmedCategory = (data.category || '').trim();
  if (!trimmedCategory) {
    errors.category = 'Please choose or specify a category.';
  } else if (trimmedCategory.length > 40) {
    errors.category = 'Category cannot exceed 40 characters.';
  }

  // URL validation
  const trimmedUrl = (data.url || '').trim();
  if (!trimmedUrl) {
    errors.url = 'Resource URL is required.';
  } else if (!isValidWebUrl(trimmedUrl)) {
    errors.url = 'Please enter a valid web URL starting with http:// or https://';
  }

  // Description validation
  const trimmedDesc = (data.desc || '').trim();
  if (!trimmedDesc) {
    errors.desc = 'A brief description is required.';
  } else if (trimmedDesc.length < 10) {
    errors.desc = 'Description should be at least 10 characters so users understand what it offers.';
  } else if (trimmedDesc.length > 500) {
    errors.desc = 'Description cannot exceed 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
