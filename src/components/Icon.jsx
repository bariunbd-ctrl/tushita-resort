import React from 'react';
import {
  Wind, Leaf, Heart, Sun, TreePine, Mountain, Home, Utensils, Flame,
  Bike, Tent, Coffee, Waves, Snowflake, Bird, Fish, Star, Sparkles,
  MapPin, Wifi, Car, Bed, Brain, Palette, Music, Users, Globe,
} from 'lucide-react';

const ICONS = {
  Wind, Leaf, Heart, Sun, TreePine, Mountain, Home, Utensils, Flame,
  Bike, Tent, Coffee, Waves, Snowflake, Bird, Fish, Star, Sparkles,
  MapPin, Wifi, Car, Bed, Brain, Palette, Music, Users, Globe,
};

export default function Icon({ name, className = 'w-6 h-6', ...props }) {
  const Cmp = (name && ICONS[name]) || Sparkles;
  return <Cmp className={className} {...props} />;
}

export const ICON_OPTIONS = Object.keys(ICONS);
