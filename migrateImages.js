// migrateImages.js
const mongoose = require('mongoose');
const Listing = require('./models/listing');  // adjust path if needed

const mongoUrl = 'mongodb://127.0.0.1:27017/g-shock';
const DEFAULT_IMG = 'https://via.placeholder.com/300?text=No+Image';

async function migrate() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(' Connected to DB');

    const listings = await Listing.find({});
    console.log(`🔍 Found ${listings.length} listings`);

    let migratedCount = 0;
    for (let doc of listings) {
      const needsMigration = (
        typeof doc.image === 'string' ||
        !doc.image ||
        typeof doc.image.url !== 'string'
      );
      if (needsMigration) {
        const oldVal = typeof doc.image === 'string' ? doc.image.trim() : '';
        const newUrl = oldVal || DEFAULT_IMG;

        doc.image = {
          filename: doc.image?.filename || 'migrated-image',
          url: newUrl
        };

        await doc.save();
        console.log(`✔ Migrated ${doc._id} → ${newUrl}`);
        migratedCount++;
      }
    }

    console.log(` Migration complete. ${migratedCount} documents updated.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

migrate();
