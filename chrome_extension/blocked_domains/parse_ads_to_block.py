source_file = "ads_to_block_source.txt"
parsed_file = "ads_to_block.txt"
parsed_file2 = "ads_to_block2.txt" 

# parse into format *://*/*
with open(parsed_file, "w") as out_file:
    with open(source_file, "r") as in_file:
        for line in in_file:
            if not line.startswith("|"):
                continue
            line = line.replace("||", "*://*.").replace("^", "/*")
            out_file.write(f"{line}")

# parse into format *://*/*, for ease of copying
with open(parsed_file2, "w") as out_file:
    with open(source_file, "r") as in_file:
        for line in in_file:
            if not line.startswith("|"):
                continue
            line = line.replace("||", "*://*.").replace("^", "/*").strip("\n")
            out_file.write(f'"{line}",\n')
