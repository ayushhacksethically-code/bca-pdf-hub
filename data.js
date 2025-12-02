// Data structure for the BCA PDF repository
const pdfRepository = {
  semesters: [
    {
      id: "1st_semester",
      name: "1st Semester",
      subjects: [
        {
          id: "bcs-012",
          name: "BCS-012 Mathematics",
          blocks: [
            {
              id: "block-1",
              name: "Block-1 Algebra-I",
              units: [
                { name: "Unit-1", file: "Unit-1.pdf" },
                { name: "Unit-2", file: "Unit-2.pdf" },
                { name: "Unit-3", file: "Unit-3.pdf" },
                { name: "Unit-4", file: "Unit-4.pdf" }
              ]
            },
            {
              id: "block-2",
              name: "Block-2 Algebra-II",
              units: [
                { name: "Unit-1", file: "Unit-1.pdf" },
                { name: "Unit-2", file: "Unit-2.pdf" },
                { name: "Unit-3", file: "Unit-3.pdf" },
                { name: "Unit-4", file: "Unit-4.pdf" }
              ]
            },
            {
              id: "block-3",
              name: "Block-3 Calculus",
              units: [
                { name: "Unit-1", file: "Unit-1 .pdf" },
                { name: "Unit-2", file: "Unit-2.pdf" },
                { name: "Unit-3", file: "Unit-3.pdf" },
                { name: "Unit-4", file: "Unit-4.pdf" }
              ]
            },
            {
              id: "block-4",
              name: "Block-4 Vectors and Three-Dimensional Geometry",
              units: [
                { name: "Unit-1", file: "Unit-1.pdf" },
                { name: "Unit-2", file: "Unit-2.pdf" },
                { name: "Unit-3", file: "Unit-3.pdf" },
                { name: "Unit-4", file: "Unit-4.pdf" }
              ]
            }
          ]
        },
        {
          id: "bcs-111",
          name: "BCS-111 Computer Basics and PC Software",
          blocks: [
            {
              id: "block-1",
              name: "Block 1 Basics of Computer Hardware",
              units: [
                { name: "UNIT 1", file: "UNIT 1.pdf" },
                { name: "UNIT 2", file: "UNIT 2.pdf" },
                { name: "UNIT 3", file: "UNIT 3.pdf" },
                { name: "UNIT 4", file: "UNIT 4.pdf" },
                { name: "UNIT 5", file: "UNIT 5.pdf" }
              ]
            },
            {
              id: "block-2",
              name: "Block 2 Basics of Computer Software",
              units: [
                { name: "UNIT- 1", file: "UNIT- 1.pdf" },
                { name: "UNIT-2", file: "UNIT-2.pdf" },
                { name: "UNIT-3", file: "UNIT-3.pdf" },
                { name: "UNIT- 4", file: "UNIT- 4.pdf" }
              ]
            },
            {
              id: "block-3",
              name: "Block 3 Internet Technologies",
              units: [
                { name: "UNIT - 1", file: "UNIT - 1.pdf" },
                { name: "UNIT - 2", file: "UNIT - 2.pdf" },
                { name: "UNIT - 3", file: "UNIT - 3.pdf" }
              ]
            }
          ]
        },
        {
          id: "bcsl-013",
          name: "BCSL-013 Computer Basics and PC Software Lab",
          blocks: [
            {
              id: "block-1",
              name: "Block-1 Lab Course",
              units: [
                { name: "UNIT 1", file: "UNIT 1.pdf" },
                { name: "UNIT 2", file: "UNIT 2.pdf" },
                { name: "UNIT 3", file: "UNIT 3.pdf" },
                { name: "UNIT 4", file: "UNIT 4.pdf" },
                { name: "UNIT 5", file: "UNIT 5.pdf" },
                { name: "UNIT 6", file: "UNIT 6.pdf" }
              ]
            }
          ]
        },
        {
          id: "begla-136",
          name: "BEGLA-136 English at the Workplace",
          blocks: [
            { name: "Block-1", file: "Block-1.pdf" },
            { name: "Block-2", file: "Block-2.pdf" },
            { name: "Block-3", file: "Block-3.pdf" },
            { name: "Block-4", file: "Block-4.pdf" }
          ]
        },
        {
          id: "bevae-181",
          name: "BEVAE-181 Environmental Studies",
          blocks: [
            { name: "Block1", file: "Block1.pdf" },
            { name: "Block2", file: "Block2.pdf" },
            { name: "Block3", file: "Block3.pdf" },
            { name: "Block4", file: "Block4.pdf" }
          ]
        }
      ]
    }
    // Additional semesters can be added here in the future
  ]
};
