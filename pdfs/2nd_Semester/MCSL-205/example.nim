import strutils, sequtils, math, strformat

while true:
    echo "Enter counts for A B C D F:"
    let c = stdin.readLine.split.map(parseInt)
    if c.len == 5 and c.min >= 0 and c.sum > 0:
        let gpa = zip([4,3,2,1,0], c).mapIt(it[0] * it[1]).sum / c.sum
        let s = ["Probation", "Satisfactory", "Honors", "High Honors"][(gpa >= 2.0).int + (gpa >= 3.0).int + (gpa >= 3.51).int]
        echo &"Subjects: {c.sum} | GPA: {gpa:.2f} | Standing: {s}"
        break
    echo "❌ Invalid!\n"
