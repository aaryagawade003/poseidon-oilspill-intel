"""Lightweight syntax smoke test for CI environments."""
from pathlib import Path
import py_compile

for path in Path(__file__).parent.glob("*.py"):
    py_compile.compile(str(path), doraise=True)
print("POSEIDON backend syntax: OK")
