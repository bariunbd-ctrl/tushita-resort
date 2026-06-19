// Analytics service — tracks events to localStorage and summarizes them.

import { localAdapter } from './adapters/localAdapter.js';
import { getDeviceType } from '../utils/formatters.js';

const adapter = localAdapter;
const COLLECTION = 'analytics_events';

function genId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function trackEvent(eventData = {}) {
  const event = {
    id: genId(),
    type: eventData.type || 'unknown',
    language: eventData.language || 'mn',
    device: eventData.device || getDeviceType(),
    meta: { ...eventData },
    timestamp: new Date().toISOString(),
  };
  try {
    adapter.insert(COLLECTION, event);
  } catch (e) {
    console.error('trackEvent failed', e);
  }
  return event;
}

export function getAllEvents() {
  return adapter.getCollection(COLLECTION);
}

export function getEventsByDateRange(startDate, endDate) {
  const start = startDate ? new Date(startDate).getTime() : -Infinity;
  const end = endDate ? new Date(endDate).getTime() : Infinity;
  return getAllEvents().filter((e) => {
    const t = new Date(e.timestamp).getTime();
    return t >= start && t <= end;
  });
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d;
}

export function getAnalyticsSummary() {
  const events = getAllEvents();
  const today = startOfToday();
  const weekAgo = startOfWeek();

  const isToday = (e) => new Date(e.timestamp) >= today;
  const isThisWeek = (e) => new Date(e.timestamp) >= weekAgo;

  const countType = (type, filterFn = () => true) =>
    events.filter((e) => e.type === type && filterFn(e)).length;

  // Most clicked button among the click event types
  const clickTypes = ['phone_click', 'map_click', 'social_click'];
  const clickCounts = clickTypes.map((type) => ({ type, count: countType(type) }));
  clickCounts.sort((a, b) => b.count - a.count);
  const topButton = clickCounts[0]?.count > 0 ? clickCounts[0].type : null;

  // Language ratio (based on page_view events)
  const pageViews = events.filter((e) => e.type === 'page_view');
  const mnViews = pageViews.filter((e) => e.language === 'mn').length;
  const enViews = pageViews.filter((e) => e.language === 'en').length;
  const totalLangViews = mnViews + enViews || 1;

  return {
    totalEvents: events.length,
    todayPageViews: countType('page_view', isToday),
    weekPageViews: countType('page_view', isThisWeek),
    totalPageViews: pageViews.length,
    phoneClicks: countType('phone_click'),
    mapClicks: countType('map_click'),
    socialClicks: countType('social_click'),
    priceViews: countType('price_view'),
    bookingSubmits: countType('booking_submit'),
    languageChanges: countType('language_change'),
    topButton,
    clickCounts,
    languageRatio: {
      mn: mnViews,
      en: enViews,
      mnPercent: Math.round((mnViews / totalLangViews) * 100),
      enPercent: Math.round((enViews / totalLangViews) * 100),
    },
  };
}

export default {
  trackEvent,
  getAnalyticsSummary,
  getEventsByDateRange,
  getAllEvents,
};
