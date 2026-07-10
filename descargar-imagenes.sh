#!/bin/bash

# =============================================
# Peruvian Corner — Descarga de imágenes
# Ejecutá este script desde la carpeta raíz
# del repositorio: peruvian-corner/
# =============================================

mkdir -p images

IMAGES=(
  "https://peruviancorner808.com/wp-content/uploads/2024/09/cropped-peruviancornerlogo.jpg"
  "https://peruviancorner808.com/wp-content/uploads/2024/04/2024-03-17-1.jpeg"
  "https://peruviancorner808.com/wp-content/uploads/2024/04/calamari-lokahi-kailua-market-2024-03-31-2.jpeg"
  "https://peruviancorner808.com/wp-content/uploads/2024/04/lomo-saltado-with-noodles-lokahi-kailua-market-2024-03-03-1.jpeg"
  "https://peruviancorner808.com/wp-content/uploads/2024/04/salchipapaps-lokahi-kailua-market-2024-03-31-1.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/aji-de-gallina-pulled-chicken-on-aji-cream-sauce-2023-10-21-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/anticuchos-grilled-maguro-tuna-2023-11-19-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/anticuchos-grilled-salmon-2023-06-25-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/arroz-con-mariscos-rice-n-seafood-2023-04-21-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/arroz-con-pollo-rice-n-chicken-w-cilantro-spinach-sauce-2023-11-19-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/arroz-con-tinta-de-calamar-rice-n-squid-ink-2023-04-23-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/arroz-meloso-con-mariscos-risotto-n-seafood-2023-04-21-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/causa-de-pulpo-al-olivo-potato-salad-n-octopus-in-calamata-salad-2024-01-13-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/causa-de-tartar-de-salmon-potato-salad-n-salmon-tartare-2023-07-27-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/ceviche-clasico-ceviche-classic-2023-05-07-4.jpg"
  "https://peruviancorner808.files.wordpress.com/2024/01/ceviche-clasico-de-mahi-mahi-ceviche-classic-n-mahi-mahi-2023-07-02-4.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/chaufa-de-salmon-fried-rice-n-salmon-2023-09-30-3.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/cheesecake-de-maracuya-cheesecake-n-lilikoi-2023-05-07-3.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/chicharron-pork-belly-2023-07-02-3.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/chilcano-fish-consome-2023-05-07-3.jpg"
  "https://peruviancorner808.files.wordpress.com/2024/01/fuego-de-conchitas-fire-n-scallops-2023-09-24-3.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/jalea-deep-fry-n-seafood-2023-05-07-2.jpg"
  "https://peruviancorner808.files.wordpress.com/2024/01/lomo-saltado-con-fideos-a-la-huancaina-stir-fry-beef-n-queso-fresco-mac-and-cheese-pasta-2023-09-30.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/lomo-saltado-stir-fry-beef-2023-10-22-1.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/palta-rellena-con-tartar-de-salmon-avocado-n-salmon-tartare-2023-06-17-1.jpg"
  "https://peruviancorner808.files.wordpress.com/2024/01/papa-a-la-huancaina-potato-salad-n-queso-fresco-dressing-2023-04-21-1.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/plancha-de-carne-grill-n-steak-2023-04-23-1.jpg"
  "https://peruviancorner808.files.wordpress.com/2024/01/pulpo-al-olivo-octopus-salad-n-calamata-dressing-2023-05-07.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/pulpo-nikkei-octopus-n-japanese-aromatics-n-potato-puree-2024-01-13.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/sashimi-de-blue-fin-toro-sashimi-n-blue-fin-toro-2024-01-14.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/suspiro-de-limena-zabaglione-n-dulce-de-leche-2024-01-06.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/tamales-de-lima-tamal-2023-12-17.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/tartare-nikei-de-blue-fin-toro-tartare-n-blue-fin-tuna-2024-01-14.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/tiradito-de-salmon-sashimi-ceviche-n-salmon-2023-09-24-1.jpeg"
  "https://peruviancorner808.files.wordpress.com/2024/01/tiradito-trufado-sashimi-ceviche-n-truffle-oil-2023-05-01-1.jpg"
  "https://peruviancorner808.wordpress.com/wp-content/uploads/2024/01/tiradito-2023-10-22-7.jpeg"
  "https://peruviancorner808.wordpress.com/wp-content/uploads/2024/02/waialua-farmers-2024-02.jpeg"
)

echo "Descargando 37 imágenes..."
COUNT=0

for URL in "${IMAGES[@]}"; do
  FILENAME=$(basename "$URL")
  echo "[$((COUNT+1))/37] $FILENAME"
  curl -s -L -o "images/$FILENAME" "$URL"
  COUNT=$((COUNT+1))
done

echo ""
echo "✅ Listo! Las imágenes están en la carpeta images/"
echo "Total descargadas: $COUNT"
