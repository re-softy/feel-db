export const emotionToEmoji: { [key: string]: string } = {
	Joy: '😃',
	Sadness: '😭',
	Fear: '😱',
	Anger: '🤬',
	Disgust: '🤢',
	Surprise: '🤯',
	Anticipation: '🧐',
	Happiness: '😊',
	Melancholy: '😢',
	Curiosity: '🤔',
	Love: '🥰',
	Nostalgia: '🥺',
	Humor: '😂',
	Excitement: '🤩',
	Anxiety: '😨',
	Guilt: '😓',
	Hope: '🤞',
	Confusion: '😕',
	Disturbing: '😳',
	Inspiration: '😏',
	Envy: '😐',
	Empathy: '🥲',
	Relief: '😋',
	Satisfaction: '😊',
	Awe: '🤗',
};

function capitalizeFirstLetter(value: string): string {
	if (!value) return value;
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getEmojiForEmotion(name: string): string {
	if (!name) return '';
	const direct = emotionToEmoji[name];
	if (direct) return direct;
	const capitalized = emotionToEmoji[capitalizeFirstLetter(name.toLowerCase())];
	if (capitalized) return capitalized;
	return name;
} 