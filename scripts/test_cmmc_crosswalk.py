"""Reject population/claim drift that could make a draft look like assessment evidence."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

path = Path(__file__).with_name("check-cmmc-crosswalk.py")
spec = importlib.util.spec_from_file_location("cmmc_check", path)
check = importlib.util.module_from_spec(spec)
spec.loader.exec_module(check)


class CMMCBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads(check.DATA.read_text(encoding="utf-8"))

    def rejected(self, mutate):
        data = copy.deepcopy(self.data)
        mutate(data)
        with self.assertRaises(AssertionError):
            check.validate(data)

    def test_current_catalog(self):
        self.assertEqual(len(check.validate(self.data)), 110)

    def test_missing_requirement(self):
        self.rejected(lambda d: d["rows"].pop())

    def test_duplicate_requirement(self):
        self.rejected(lambda d: d["rows"].__setitem__(1, d["rows"][0]))

    def test_fabricated_met(self):
        self.rejected(lambda d: d["rows"][1].__setitem__("assessment_result", "MET"))

    def test_nonexistent_objective(self):
        self.rejected(lambda d: d["rows"][1].__setitem__("candidate_objectives", ["z"]))

    def test_diagnostic_is_not_requirement(self):
        self.rejected(lambda d: d["rows"][1].__setitem__("gkos_ids", ["GKOS-GATE-L7-001"]))

    def test_superseded_requirement_is_not_active(self):
        self.rejected(lambda d: d["rows"][1].__setitem__("gkos_ids", ["GKOS-DELEGATION-004"]))

    def test_status_claim(self):
        self.rejected(lambda d: d.__setitem__("cmmc_status_claim", "Level 2"))


if __name__ == "__main__":
    unittest.main()
