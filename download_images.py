import urllib.request
import os

images = {
    "pinel-salpetriere.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pinel_delivrant_les_alienes.jpg/1280px-Pinel_delivrant_les_alienes.jpg",
    "pinel-portrait.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Philippe_Pinel.jpg/800px-Philippe_Pinel.jpg",
    "pasteur-lab.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg/1024px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg",
    "pasteur-portrait.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Louis_Pasteur%2C_foto_crop.jpg/800px-Louis_Pasteur%2C_foto_crop.jpg",
    "pasteur-meister.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg/1024px-Louis_Pasteur_vaccinating_a_child_against_rabies._Wood_engra_Wellcome_V0010574.jpg",
    "curie-portrait.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg",
    "curie-lab-couple.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pierre_and_Marie_Curie.jpg/1024px-Pierre_and_Marie_Curie.jpg",
    "curie-petite-curie.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg/1024px-Marie_Curie_in_a_mobile_x-ray_vehicle_during_WWI.jpg",
    "pierre-curie.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pierre_Curie_by_Dujardin_c1906.jpg/800px-Pierre_Curie_by_Dujardin_c1906.jpg",
    "joseph-meister.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Joseph_Meister.jpg/800px-Joseph_Meister.jpg",
    "edward-jenner.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Edward_Jenner._Oil_painting._Wellcome_V0023503.jpg/800px-Edward_Jenner._Oil_painting._Wellcome_V0023503.jpg"
}

out_dir = r"C:\Users\gaura\.gemini\antigravity\scratch\french-science-presentation\assets\images"
headers = {'User-Agent': 'FrenchScienceArchiveExhibition/1.0 (educational museum project; mail@example.com)'}

for filename, url in images.items():
    dest = os.path.join(out_dir, filename)
    print(f"Downloading {filename} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        size = os.path.getsize(dest)
        print(f"-> SUCCESS: {filename} ({size} bytes)")
    except Exception as e:
        print(f"-> ERROR for {filename}: {e}")
