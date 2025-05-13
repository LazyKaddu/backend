// ✅ Food Recommendation Function

function recommendForUser(userData, foodPosts) {
    const typeMapping = {
      "wedding": [1, 0, 0],
      "party": [0, 1, 0],
      "restaurant": [0, 0, 1],
    };
  
    function cosineSimilarity(vecA, vecB) {
      const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
      const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
      const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
      return magA && magB ? dotProduct / (magA * magB) : 0;
    }
  
    function jaccardSimilarity(arr1, arr2) {
      const set1 = new Set(arr1);
      const set2 = new Set(arr2);
      const intersection = new Set([...set1].filter(x => set2.has(x)));
      const union = new Set([...set1, ...set2]);
      return union.size > 0 ? intersection.size / union.size : 0;
    }
  
    const maxServings = Math.max(...foodPosts.map(p => p.servings));
  
    // Calculate user preferred type vector (averaged)
    const userTypeVec = userData.preferredTypes
      .map(type => typeMapping[type] || [0, 0, 0])
      .reduce((acc, vec) => acc.map((x, i) => x + vec[i]), [0, 0, 0])
      .map(x => x / userData.preferredTypes.length); // normalize
  
    // Score each post
    return foodPosts.map(post => {
      const itemSim = jaccardSimilarity(userData.likedItems, post.items);
      const servingsSim = 1 - Math.abs(post.servings - userData.averageServings.reduce((sum, num) => sum + num, 0) / (userData.averageServings.length-1)) / maxServings;
      const typeVec = typeMapping[post.type] || [0, 0, 0];
      const typeSim = cosineSimilarity(userTypeVec, typeVec);
  
      const score = (itemSim * 0.5) + (servingsSim * 0.3) + (typeSim * 0.2);
  
      return { ...post, similarityScore: score };
    }).sort((a, b) => b.similarityScore - a.similarityScore);
  }

export default recommendForUser;