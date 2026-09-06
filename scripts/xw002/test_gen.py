"""Reject misleading row sets before generating apparently consistent outputs."""
import copy
import unittest
from unittest.mock import patch

import gen


class RowIntegrityTests(unittest.TestCase):
    def assert_rejected(self, rows, message):
        with self.assertRaisesRegex(ValueError, message):
            gen.validate_rows(rows)

    def test_current_population(self):
        gen.validate_rows(gen.ROWS)

    def test_duplicate_would_overwrite_json(self):
        self.assert_rejected(gen.ROWS + [gen.ROWS[0]], "Duplicate requirement")

    def test_missing_allocation(self):
        self.assert_rejected(gen.ROWS[1:], "Missing or unexpected")

    def test_diagnostic_is_not_requirement(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=("GKOS-GATE-L7-001",)+rows[0][1:]
        self.assert_rejected(rows, "Missing or unexpected")

    def test_unknown_class(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=(rows[0][0], "ALIGNED", *rows[0][2:])
        self.assert_rejected(rows, "Unknown relationship")

    def test_unknown_subcategory(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=(rows[0][0], "CON", ["MEASURE 2.99"], *rows[0][3:])
        self.assert_rejected(rows, "Unknown NIST")

    def test_no_mapping_cannot_carry_subcategory(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=(rows[0][0], "NDM", ["MEASURE 2.8"], *rows[0][3:])
        self.assert_rejected(rows, "Class and subcategory")

    def test_duplicate_subcategory(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=(rows[0][0], "CON", ["MEASURE 2.8"]*2, *rows[0][3:])
        self.assert_rejected(rows, "Duplicate subcategory")

    def test_false_supersession(self):
        rows=copy.deepcopy(gen.ROWS)
        rows[0]=(rows[0][0], "SUP", [], *rows[0][3:])
        self.assert_rejected(rows, "Superseded standing")

    def test_modified_baseline(self):
        with patch.object(gen, "REGISTRY_SHA256", "0"*64):
            self.assert_rejected(gen.ROWS, "snapshot changed")

    def test_generation_fails_before_duplicate_can_collapse(self):
        with patch.object(gen, "ROWS", gen.ROWS+[gen.ROWS[0]]):
            with self.assertRaisesRegex(ValueError, "Duplicate requirement"):
                gen.generate()

    def test_iso_hold_emits_no_rows(self):
        import json
        payload=json.loads(gen.build_json("0"*64))
        self.assertEqual(payload["external_baselines"]["iso_42001"]["status"], "verification-held")
        self.assertTrue(all("iso_42001" not in row for row in payload["requirements"].values()))


if __name__ == "__main__":
    unittest.main()
