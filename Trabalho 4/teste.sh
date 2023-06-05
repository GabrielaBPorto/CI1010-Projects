#!/bin/bash

OUTPUT_DIR="output"
CURRICULUM_FILE="curriculum1998.json"
STUDENT_DATA_FILE="alunos.xml"

mkdir -p "$OUTPUT_DIR"


echo "Testing fetchCurriculumData()..."

echo "Command: node script.js fetchCurriculumData > $OUTPUT_DIR/fetched_curriculum.json"

echo "Testing fetchStudentData()..."

echo "Command: node script.js fetchStudentData > $OUTPUT_DIR/fetched_student_data.json"

rm -rf "$OUTPUT_DIR"

echo "Testing completed."
