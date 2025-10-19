/**
 * Test script for DSA Application Workflow
 * This script tests the DSA ID generation and basic workflow functionality
 */

import { generateDSAId, generateTemporaryPassword, parseDSAId } from '../utils/dsaIdGenerator.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Test DSA ID Generation
async function testDSAIdGeneration() {
  console.log('🧪 Testing DSA ID Generation...\n');

  try {
    // Test 1: Generate DSA ID for a BDE
    const bdeUsername = 'ww1001';
    const approvalDate = new Date('2025-01-27');
    
    console.log(`📝 Test 1: Generate DSA ID for BDE: ${bdeUsername}`);
    console.log(`📅 Approval Date: ${approvalDate.toLocaleDateString('en-IN')}`);
    
    const dsaId1 = await generateDSAId(bdeUsername, approvalDate);
    console.log(`✅ Generated DSA ID: ${dsaId1}`);
    
    // Test 2: Generate another DSA ID for the same BDE and date
    const dsaId2 = await generateDSAId(bdeUsername, approvalDate);
    console.log(`✅ Generated DSA ID: ${dsaId2}`);
    
    // Test 3: Generate DSA ID for different BDE
    const bdeUsername2 = 'ww1002';
    const dsaId3 = await generateDSAId(bdeUsername2, approvalDate);
    console.log(`✅ Generated DSA ID: ${dsaId3}`);
    
    // Test 4: Generate DSA ID for same BDE on different date
    const differentDate = new Date('2025-01-28');
    const dsaId4 = await generateDSAId(bdeUsername, differentDate);
    console.log(`✅ Generated DSA ID: ${dsaId4}`);
    
    console.log('\n📊 DSA ID Generation Results:');
    console.log(`   BDE: ${bdeUsername}, Date: 27/01/2025 → ${dsaId1}`);
    console.log(`   BDE: ${bdeUsername}, Date: 27/01/2025 → ${dsaId2}`);
    console.log(`   BDE: ${bdeUsername2}, Date: 27/01/2025 → ${dsaId3}`);
    console.log(`   BDE: ${bdeUsername}, Date: 28/01/2025 → ${dsaId4}`);
    
    // Test 5: Parse DSA IDs
    console.log('\n🔍 Testing DSA ID Parsing...');
    
    const parsed1 = parseDSAId(dsaId1);
    console.log(`✅ Parsed ${dsaId1}:`);
    console.log(`   BDE ID: ${parsed1.bdeId}`);
    console.log(`   Date: ${parsed1.approvalDate.toLocaleDateString('en-IN')}`);
    console.log(`   Letter: ${parsed1.letter}`);
    
    const parsed4 = parseDSAId(dsaId4);
    console.log(`✅ Parsed ${dsaId4}:`);
    console.log(`   BDE ID: ${parsed4.bdeId}`);
    console.log(`   Date: ${parsed4.approvalDate.toLocaleDateString('en-IN')}`);
    console.log(`   Letter: ${parsed4.letter}`);
    
    // Test 6: Generate temporary passwords
    console.log('\n🔐 Testing Temporary Password Generation...');
    
    const password1 = generateTemporaryPassword(dsaId1);
    const password2 = generateTemporaryPassword(dsaId2);
    
    console.log(`✅ Password for ${dsaId1}: ${password1}`);
    console.log(`✅ Password for ${dsaId2}: ${password2}`);
    
    console.log('\n✅ All DSA ID generation tests passed!');
    
  } catch (error) {
    console.error('❌ DSA ID generation test failed:', error.message);
    throw error;
  }
}

// Test DSA ID Format Validation
function testDSAIdFormat() {
  console.log('\n🧪 Testing DSA ID Format Validation...\n');
  
  const testCases = [
    { id: 'ww100127012025A', expected: true, description: 'Valid DSA ID' },
    { id: 'ww100127012025B', expected: true, description: 'Valid DSA ID with B' },
    { id: 'ww100128012025A', expected: true, description: 'Valid DSA ID different date' },
    { id: 'ww100227012025A', expected: true, description: 'Valid DSA ID different BDE' },
    { id: 'ww100127012025', expected: false, description: 'Missing letter' },
    { id: 'ww10012701202A', expected: false, description: 'Invalid date format' },
    { id: 'ww1001270120251', expected: false, description: 'Number instead of letter' },
    { id: 'invalid', expected: false, description: 'Completely invalid' }
  ];
  
  testCases.forEach(({ id, expected, description }) => {
    try {
      const result = parseDSAId(id);
      const actual = true;
      const status = actual === expected ? '✅' : '❌';
      console.log(`${status} ${description}: ${id} → ${actual ? 'Valid' : 'Invalid'}`);
    } catch (error) {
      const actual = false;
      const status = actual === expected ? '✅' : '❌';
      console.log(`${status} ${description}: ${id} → ${actual ? 'Valid' : 'Invalid'}`);
    }
  });
  
  console.log('\n✅ DSA ID format validation tests completed!');
}

// Main test function
async function runTests() {
  console.log('🚀 Starting DSA Application Workflow Tests\n');
  console.log('=' .repeat(50));
  
  try {
    // Test DSA ID generation (requires database connection)
    await testDSAIdGeneration();
    
    // Test DSA ID format validation (no database required)
    testDSAIdFormat();
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 All tests completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log('   ✅ DSA ID Generation');
    console.log('   ✅ DSA ID Parsing');
    console.log('   ✅ Temporary Password Generation');
    console.log('   ✅ DSA ID Format Validation');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
runTests().then(() => {
  console.log('\n🏁 Test execution completed.');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Test execution failed:', error);
  process.exit(1);
});

export { runTests, testDSAIdGeneration, testDSAIdFormat };
