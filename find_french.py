import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

french_words = [' pourquoi ', ' chauffer ', ' déchaînement ', ' aliénation ', ' nosographie ', ' soigner ', ' vigneron ', ' le vin ', ' dans un ', ' premier essai ', ' mise en service ', ' bonjour à tous ', ' souligner les ', ' tout a débuté ', ' écouter en ', ' traité ', ' aliénés ']

for i, line in enumerate(lines):
    l_lower = line.lower()
    for w in french_words:
        if w in l_lower:
            print(f'{i+1}: {line.strip()[:110]}')
            break
