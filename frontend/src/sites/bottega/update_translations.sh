#!/bin/bash

# Backup
cp App.js App.js.bak2

# Holiday notice
sed -i 's|<span className="font-bold">Let op:</span> Voor het einde van het jaar zijn wij gesloten op: 24, 25 december en 29, 30, 31 december en 1 januari 2026.|<span className="font-bold">{t('"'"'letOp'"'"')}</span> {t('"'"'closureNotice'"'"')}|g' App.js

# About section
sed -i 's|<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Authentieke Italiaanse Ervaring</h2>|<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('"'"'aboutTitle'"'"')}</h2>|g' App.js

echo "Translation updates applied"
